# app/api/analytics.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.auth import get_current_user
from app.schemas.analytics import AnalyticsStats, ChartDataPoint, FunnelDataPoint
from typing import List, Dict
import csv
from fastapi.responses import StreamingResponse
from io import StringIO

router = APIRouter()

@router.get("/stats", response_model=AnalyticsStats)
def get_analytics_stats(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    # Здесь логика получения статистики из базы данных
    from app.services.analytics import get_analytics_stats
    return get_analytics_stats(db)

@router.get("/sales-chart", response_model=List[ChartDataPoint])
def get_sales_chart_data(period: str = "month", db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    # Проверка параметра period
    if period not in ["month", "year"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Параметр period должен быть 'month' или 'year'"
        )
    
    # Получение данных для графика
    from app.services.analytics import get_sales_chart_data
    return get_sales_chart_data(db, period)

@router.get("/marketing-chart", response_model=Dict[str, List[ChartDataPoint]])
def get_marketing_chart_data(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.analytics import get_marketing_chart_data
    return get_marketing_chart_data(db)

@router.get("/conversion-funnel", response_model=List[FunnelDataPoint])
def get_conversion_funnel_data(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.analytics import get_conversion_funnel_data
    return get_conversion_funnel_data(db)

@router.post("/export")
def export_analytics_data(date_range: Dict[str, str], db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    # Получение данных для экспорта
    from app.services.analytics import get_export_data
    data = get_export_data(db, date_range)
    
    # Создание CSV-файла
    output = StringIO()
    writer = csv.writer(output)
    
    # Запись заголовков
    writer.writerow(["Дата", "Доход", "Контракты", "Конверсия"])
    
    # Запись данных
    for row in data:
        writer.writerow([row["date"], row["revenue"], row["contracts"], row["conversion"]])
    
    # Возврат CSV-файла
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=analytics-export.csv"}
    )