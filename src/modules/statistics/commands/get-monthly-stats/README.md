# `get-monthly-stats`

### HTTP Request

`GET http://example.com/api/stats/monthly`

### Response

```json
[
  {
    "day": "July, 4th",
    "total_distance": "12km",
    "avg_ride": "4km",
    "avg_price": "22.75PLN"
  },
  {
    "day": "July, 5th",
    "total_distance": "3km",
    "avg_ride": "3km",
    "avg_price": "15.50PLN"
  }
]
```

This endpoint retrieves a summary of ride distances from current month, grouped by day. The summary should include sum
of all rides distances from given day, average ride distance and average price for the ride.
