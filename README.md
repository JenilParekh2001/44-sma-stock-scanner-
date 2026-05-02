# SwingEdge 44

SwingEdge 44 is a clean responsive website concept for a USA and Canada swing-trading scanner.

## What it includes

- Dashboard layout
- Ranked stock results table
- USA and Canada filters
- Signal filters
- Buy level, stop, targets, support, resistance, SMA, and volume ratio fields
- Plain-English price action explanation
- Simple strategy section for each stock

## Scanner logic shown in the interface

The interface is designed around these filters:

- Fundamental score above 70 out of 100
- Rising 44-day simple moving average
- Uptrend confirmation
- Pullback near the 44-day SMA
- Green daily candle
- Close above the 44-day SMA
- Volume above 1.3 times the 20-day average volume
- Neutral or bullish market condition
- Minimum 1 to 2 risk/reward setup

## Note

The current version uses sample data so the site can run as a static GitHub Pages website. To use live market data, connect a licensed market-data source and replace the sample data in `app.js`.

This project is for education, design, and research only. It is not financial advice.
