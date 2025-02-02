from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
import groq
import os
from datetime import datetime, timedelta
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

top_stocks = {
    "AAPL": "Apple Inc.",
    "MSFT": "Microsoft Corporation",
    "GOOGL": "Alphabet Inc.",
    "AMZN": "Amazon.com Inc.",
    "TSLA": "Tesla Inc.",
    "JNJ": "Johnson & Johnson",
    "V": "Visa Inc.",
    "WMT": "Walmart Inc.",
    "NVDA": "NVIDIA Corporation",
    "PYPL": "PayPal Holdings Inc."
}

def download_stock_data(ticker, start_date, end_date):
    try:
        stock_data = yf.download(ticker, start=start_date, end=end_date)
        if stock_data.empty:
            return None
        return stock_data
    except Exception as e:
        print(f"Error downloading data for {ticker}: {e}")
        return None

def generate_insights(stock_name, stock_data):
    client = groq.Client(api_key="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")
    prompt = f"""
    Analyze the stock performance of {stock_name}.
    Recent data: {stock_data.tail().to_dict()}
    Provide: 1. Recent trends 2. Influencing factors 3. Brief prediction
    """
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return str(e)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok",
        "timestamp": datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/api/stocks', methods=['GET'])
def get_stocks_data():
    try:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=30)
        
        stocks_data = []
        
        for ticker, name in top_stocks.items():
            try:
                stock_data = download_stock_data(ticker, start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d'))
                
                if stock_data is not None:
                    latest_data = stock_data.tail(1).iloc[0]
                    
                    # Convert Series to list properly
                    historical_data = stock_data['Close'].values.tolist()
                    
                    # Calculate daily changes
                    daily_change = latest_data['Close'] - latest_data['Open']
                    percentage_change = (daily_change / latest_data['Open']) * 100
                    
                    stock_info = {
                        'symbol': ticker,
                        'name': name,
                        'currentPrice': float(latest_data['Close']),
                        'priceChange': float(daily_change),
                        'percentageChange': float(percentage_change),
                        'volume': int(latest_data['Volume']),
                        'high': float(stock_data['High'].max()),
                        'low': float(stock_data['Low'].min()),
                        'chartData': [
                            {
                                'time': index.strftime('%Y-%m-%d'),
                                'price': float(row['Close'])
                            } for index, row in stock_data.iterrows()
                        ],
                        'insights': generate_insights(name, stock_data)
                    }
                    stocks_data.append(stock_info)
            except Exception as e:
                print(f"Error processing {ticker}: {str(e)}")
                continue
        
        if not stocks_data:
            return jsonify({
                "error": True,
                "message": "No stock data could be retrieved"
            }), 500
        
        return jsonify(stocks_data)
    
    except Exception as e:
        return jsonify({
            "error": True,
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)