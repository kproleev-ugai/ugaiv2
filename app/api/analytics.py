from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, Query

from app.core.directus import directus
from app.api.users import get_current_user
from app.schemas.user import User

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/dashboard")
async def get_dashboard_analytics(
    period: Optional[str] = "6m",
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get analytics data for the main dashboard
    """
    # This would typically query your analytics data from a database or service
    # For now, we'll return mock data that matches the frontend expectations
    
    # Enrollment data (new students per month)
    enrollment_data = [
        {"name": "Янв", "value": 65},
        {"name": "Фев", "value": 59},
        {"name": "Мар", "value": 80},
        {"name": "Апр", "value": 81},
        {"name": "Май", "value": 56},
        {"name": "Июн", "value": 55},
        {"name": "Июл", "value": 40},
        {"name": "Авг", "value": 70},
        {"name": "Сен", "value": 90},
        {"name": "Окт", "value": 75},
        {"name": "Ноя", "value": 62},
        {"name": "Дек", "value": 58},
    ]
    
    # Course data
    course_data = [
        {"name": "Программирование", "students": 120, "revenue": 1200000},
        {"name": "Дизайн", "students": 85, "revenue": 850000},
        {"name": "Маркетинг", "students": 65, "revenue": 650000},
        {"name": "Бизнес", "students": 45, "revenue": 450000},
        {"name": "IT-инфраструктура", "students": 35, "revenue": 350000},
    ]
    
    # Student status data
    student_status_data = [
        {"name": "Активные", "value": 540, "color": "#22c55e"},
        {"name": "Приостановленные", "value": 80, "color": "#eab308"},
        {"name": "Выпускники", "value": 320, "color": "#3b82f6"},
        {"name": "Отчисленные", "value": 60, "color": "#ef4444"},
    ]
    
    # Revenue data
    revenue_data = [
        {"name": "Янв", "value": 1200000},
        {"name": "Фев", "value": 1350000},
        {"name": "Мар", "value": 1800000},
        {"name": "Апр", "value": 1600000},
        {"name": "Май", "value": 1400000},
        {"name": "Июн", "value": 1700000},
    ]
    
    # Summary metrics
    metrics = {
        "students": {
            "value": "1000",
            "change": "+12%",
            "trend": "up",
            "description": "с прошлого месяца"
        },
        "teachers": {
            "value": "45",
            "change": "+3",
            "trend": "up",
            "description": "новых преподавателей"
        },
        "revenue": {
            "value": "₽8.2M",
            "change": "+18%",
            "trend": "up",
            "description": "с прошлого квартала"
        },
        "courses": {
            "value": "32",
            "change": "+5",
            "trend": "up",
            "description": "новых курсов"
        }
    }
    
    return {
        "enrollment_data": enrollment_data,
        "course_data": course_data,
        "student_status_data": student_status_data,
        "revenue_data": revenue_data,
        "metrics": metrics
    }

@router.get("/finance")
async def get_finance_analytics(
    period: Optional[str] = "6m",
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get finance analytics data
    """
    # Revenue data with targets
    revenue_data = [
        {"name": "Янв", "value": 1200000, "target": 1000000},
        {"name": "Фев", "value": 1350000, "target": 1100000},
        {"name": "Мар", "value": 1800000, "target": 1500000},
        {"name": "Апр", "value": 1600000, "target": 1600000},
        {"name": "Май", "value": 1400000, "target": 1700000},
        {"name": "Июн", "value": 1700000, "target": 1800000},
    ]
    
    # Expenses data
    expenses_data = [
        {"name": "Янв", "value": 800000},
        {"name": "Фев", "value": 850000},
        {"name": "Мар", "value": 900000},
        {"name": "Апр", "value": 950000},
        {"name": "Май", "value": 1000000},
        {"name": "Июн", "value": 1050000},
    ]
    
    # Profit data (calculated from revenue and expenses)
    profit_data = [
        {"name": item["name"], "value": item["value"] - expenses_data[i]["value"]}
        for i, item in enumerate(revenue_data)
    ]
    
    # Expense breakdown
    expense_breakdown_data = [
        {"name": "Зарплаты", "value": 450000, "color": "#3b82f6"},
        {"name": "Аренда", "value": 200000, "color": "#22c55e"},
        {"name": "Маркетинг", "value": 150000, "color": "#eab308"},
        {"name": "Оборудование", "value": 100000, "color": "#ef4444"},
        {"name": "Коммунальные услуги", "value": 80000, "color": "#8b5cf6"},
        {"name": "Прочее", "value": 70000, "color": "#ec4899"},
    ]
    
    # Revenue by source
    revenue_by_source_data = [
        {"name": "Курсы программирования", "value": 600000, "color": "#3b82f6"},
        {"name": "Курсы дизайна", "value": 400000, "color": "#22c55e"},
        {"name": "Курсы маркетинга", "value": 300000, "color": "#eab308"},
        {"name": "Курсы бизнеса", "value": 250000, "color": "#ef4444"},
        {"name": "IT-инфраструктура", "value": 150000, "color": "#8b5cf6"},
    ]
    
    # Cash flow data
    cash_flow_data = [
        {"name": "Янв", "inflow": 1200000, "outflow": 800000},
        {"name": "Фев", "inflow": 1350000, "outflow": 850000},
        {"name": "Мар", "inflow": 1800000, "outflow": 900000},
        {"name": "Апр", "inflow": 1600000, "outflow": 950000},
        {"name": "Май", "inflow": 1400000, "outflow": 1000000},
        {"name": "Июн", "inflow": 1700000, "outflow": 1050000},
    ]
    
    # Summary metrics
    metrics = {
        "total_revenue": {
            "value": "₽8.2M",
            "change": "+18%",
            "trend": "up",
            "description": "с прошлого квартала"
        },
        "expenses": {
            "value": "₽4.6M",
            "change": "+8%",
            "trend": "up",
            "description": "с прошлого квартала"
        },
        "profit": {
            "value": "₽3.6M",
            "change": "+24%",
            "trend": "up",
            "description": "с прошлого квартала"
        },
        "margin": {
            "value": "43.9%",
            "change": "+5.2%",
            "trend": "up",
            "description": "с прошлого квартала"
        }
    }
    
    return {
        "revenue_data": revenue_data,
        "expenses_data": expenses_data,
        "profit_data": profit_data,
        "expense_breakdown_data": expense_breakdown_data,
        "revenue_by_source_data": revenue_by_source_data,
        "cash_flow_data": cash_flow_data,
        "metrics": metrics
    }

@router.get("/marketing")
async def get_marketing_analytics(
    period: Optional[str] = "6m",
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get marketing analytics data
    """
    # Lead source data
    lead_source_data = [
        {"name": "Веб-сайт", "value": 120, "color": "#3b82f6"},
        {"name": "Социальные сети", "value": 85, "color": "#8b5cf6"},
        {"name": "Рекомендации", "value": 65, "color": "#22c55e"},
        {"name": "Мероприятия", "value": 45, "color": "#eab308"},
        {"name": "Email-маркетинг", "value": 35, "color": "#ef4444"},
    ]
    
    # Conversion funnel data
    conversion_data = [
        {"name": "Посетители", "value": 5000},
        {"name": "Лиды", "value": 1200},
        {"name": "Заявки", "value": 600},
        {"name": "Студенты", "value": 300},
    ]
    
    # Campaign performance data
    campaign_performance_data = [
        {"name": "Кампания 1", "leads": 45, "conversions": 15, "cost": 50000},
        {"name": "Кампания 2", "leads": 65, "conversions": 25, "cost": 75000},
        {"name": "Кампания 3", "leads": 35, "conversions": 12, "cost": 40000},
        {"name": "Кампания 4", "leads": 80, "conversions": 30, "cost": 90000},
        {"name": "Кампания 5", "leads": 55, "conversions": 20, "cost": 60000},
    ]
    
    # Channel performance data
    channel_performance_data = [
        {"name": "Янв", "website": 45, "social": 30, "email": 25, "referral": 20, "events": 15},
        {"name": "Фев", "website": 50, "social": 35, "email": 20, "referral": 25, "events": 10},
        {"name": "Мар", "website": 60, "social": 40, "email": 30, "referral": 15, "events": 20},
        {"name": "Апр", "website": 55, "social": 45, "email": 35, "referral": 30, "events": 25},
        {"name": "Май", "website": 65, "social": 50, "email": 30, "referral": 25, "events": 20},
        {"name": "Июн", "website": 70, "social": 55, "email": 35, "referral": 30, "events": 25},
    ]
    
    # Website traffic data
    website_traffic_data = [
        {"name": "Янв", "visitors": 3500, "pageviews": 12000},
        {"name": "Фев", "visitors": 4000, "pageviews": 14000},
        {"name": "Мар", "visitors": 4500, "pageviews": 16000},
        {"name": "Апр", "visitors": 4200, "pageviews": 15000},
        {"name": "Май", "visitors": 5000, "pageviews": 18000},
        {"name": "Июн", "visitors": 5500, "pageviews": 20000},
    ]
    
    # Summary metrics
    metrics = {
        "new_leads": {
            "value": "245",
            "change": "+22%",
            "trend": "up",
            "description": "с прошлого месяца"
        },
        "conversion_rate": {
            "value": "5.8%",
            "change": "+1.2%",
            "trend": "up",
            "description": "с прошлого месяца"
        },
        "acquisition_cost": {
            "value": "₽2,500",
            "change": "-15%",
            "trend": "down",
            "description": "с прошлого месяца"
        },
        "website_visitors": {
            "value": "5,500",
            "change": "+10%",
            "trend": "up",
            "description": "с прошлого месяца"
        }
    }
    
    return {
        "lead_source_data": lead_source_data,
        "conversion_data": conversion_data,
        "campaign_performance_data": campaign_performance_data,
        "channel_performance_data": channel_performance_data,
        "website_traffic_data": website_traffic_data,
        "metrics": metrics
    }

@router.get("/students")
async def get_students_analytics(
    period: Optional[str] = "6m",
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get student analytics data
    """
    # Enrollment trend data
    enrollment_trend_data = [
        {"name": "Янв", "value": 65},
        {"name": "Фев", "value": 59},
        {"name": "Мар", "value": 80},
        {"name": "Апр", "value": 81},
        {"name": "Май", "value": 56},
        {"name": "Июн", "value": 55},
        {"name": "Июл", "value": 40},
        {"name": "Авг", "value": 70},
        {"name": "Сен", "value": 90},
        {"name": "Окт", "value": 75},
        {"name": "Ноя", "value": 62},
        {"name": "Дек", "value": 58},
    ]
    
    # Students by age data
    students_by_age_data = [
        {"name": "14-18", "value": 120, "color": "#3b82f6"},
        {"name": "19-24", "value": 250, "color": "#22c55e"},
        {"name": "25-34", "value": 350, "color": "#eab308"},
        {"name": "35-44", "value": 200, "color": "#ef4444"},
        {"name": "45+", "value": 80, "color": "#8b5cf6"},
    ]
    
    # Students by course data
    students_by_course_data = [
        {"name": "Программирование", "students": 320},
        {"name": "Дизайн", "students": 220},
        {"name": "Маркетинг", "students": 180},
        {"name": "Бизнес", "students": 150},
        {"name": "IT-инфраструктура", "students": 130},
    ]
    
    # Retention data
    retention_data = [
        {"name": "1 месяц", "rate": 95},
        {"name": "3 месяца", "rate": 85},
        {"name": "6 месяцев", "rate": 75},
        {"name": "9 месяцев", "rate": 65},
        {"name": "12 месяцев", "rate": 60},
    ]
    
    # Student performance data
    student_performance_data = [
        {"name": "Отлично", "value": 250, "color": "#22c55e"},
        {"name": "Хорошо", "value": 350, "color": "#3b82f6"},
        {"name": "Удовлетворительно", "value": 150, "color": "#eab308"},
        {"name": "Неудовлетворительно", "value": 50, "color": "#ef4444"},
    ]
    
    # Attendance data
    attendance_data = [
        {"name": "Янв", "rate": 92},
        {"name": "Фев", "rate": 88},
        {"name": "Мар", "rate": 90},
        {"name": "Апр", "rate": 85},
        {"name": "Май", "rate": 82},
        {"name": "Июн", "rate": 80},
    ]
    
    # Summary metrics
    metrics = {
        "total_students": {
            "value": "1,000",
            "change": "+12%",
            "trend": "up",
            "description": "с прошлого месяца"
        },
        "new_students": {
            "value": "85",
            "change": "+15%",
            "trend": "up",
            "description": "с прошлого месяца"
        },
        "retention": {
            "value": "85%",
            "change": "+3%",
            "trend": "up",
            "description": "с прошлого месяца"
        },
        "average_performance": {
            "value": "4.2",
            "change": "+0.3",
            "trend": "up",
            "description": "с прошлого месяца"
        }
    }
    
    return {
        "enrollment_trend_data": enrollment_trend_data,
        "students_by_age_data": students_by_age_data,
        "students_by_course_data": students_by_course_data,
        "retention_data": retention_data,
        "student_performance_data": student_performance_data,
        "attendance_data": attendance_data,
        "metrics": metrics
    }
