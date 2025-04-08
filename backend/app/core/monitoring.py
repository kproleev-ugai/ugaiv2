# app/core/monitoring.py
from prometheus_client import Counter, Histogram, Gauge
import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

# Метрики
REQUEST_COUNT = Counter(
    "http_requests_total",
    "Total HTTP Requests",
    ["method", "endpoint", "status_code"]
)

REQUEST_LATENCY = Histogram(
    "http_request_duration_seconds",
    "HTTP Request Latency",
    ["method", "endpoint"]
)

ACTIVE_REQUESTS = Gauge(
    "http_active_requests",
    "Active HTTP Requests",
    ["method", "endpoint"]
)

class PrometheusMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        method = request.method
        path = request.url.path
        
        # Увеличиваем счетчик активных запросов
        ACTIVE_REQUESTS.labels(method=method, endpoint=path).inc()
        
        # Замеряем время выполнения запроса
        start_time = time.time()
        
        try:
            response = await call_next(request)
            
            # Записываем метрики
            status_code = response.status_code
            REQUEST_COUNT.labels(method=method, endpoint=path, status_code=status_code).inc()
            REQUEST_LATENCY.labels(method=method, endpoint=path).observe(time.time() - start_time)
            
            return response
        finally:
            # Уменьшаем счетчик активных запросов
            ACTIVE_REQUESTS.labels(method=method, endpoint=path).dec()