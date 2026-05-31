from datetime import datetime, timedelta
from enum import Enum
from typing import Optional
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(title="Parky API", version="0.1.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ReservationStatus(str, Enum):
    RESERVED = "RESERVED"
    CHECKED_IN = "CHECKED_IN"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    EXPIRED = "EXPIRED"


class ParkingLot(BaseModel):
    id: int
    name: str
    address: str
    total_spots: int
    available_spots: int
    price_per_hour: float


class ReservationCreate(BaseModel):
    user_name: str
    parking_lot_id: int
    start_time: datetime
    end_time: datetime


class Reservation(BaseModel):
    id: str
    user_name: str
    parking_lot_id: int
    start_time: datetime
    end_time: datetime
    tolerance_until: datetime
    qr_code: str
    status: ReservationStatus


parking_lots = [
    ParkingLot(
        id=1,
        name="Parky Shopping Paulista",
        address="Av. Paulista, 1000 - São Paulo",
        total_spots=50,
        available_spots=12,
        price_per_hour=12.0,
    ),
    ParkingLot(
        id=2,
        name="Parky Clínica Saúde",
        address="Rua Vergueiro, 500 - São Paulo",
        total_spots=30,
        available_spots=8,
        price_per_hour=10.0,
    ),
]

reservations: list[Reservation] = []


@app.get("/")
def home():
    return {"message": "Parky API funcionando"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/parking-lots")
def list_parking_lots():
    return parking_lots


@app.get("/parking-lots/{parking_lot_id}")
def get_parking_lot(parking_lot_id: int):
    parking_lot = next(
        (lot for lot in parking_lots if lot.id == parking_lot_id),
        None,
    )

    if parking_lot is None:
        raise HTTPException(status_code=404, detail="Estacionamento não encontrado")

    return parking_lot


@app.post("/reservations")
def create_reservation(data: ReservationCreate):
    parking_lot = next(
        (lot for lot in parking_lots if lot.id == data.parking_lot_id),
        None,
    )

    if parking_lot is None:
        raise HTTPException(status_code=404, detail="Estacionamento não encontrado")

    if parking_lot.available_spots <= 0:
        raise HTTPException(status_code=400, detail="Não há vagas disponíveis")

    if data.end_time <= data.start_time:
        raise HTTPException(status_code=400, detail="Horário final deve ser maior que o inicial")

    now = datetime.now(data.start_time.tzinfo)

    if data.start_time > now + timedelta(days=7):
        raise HTTPException(
        status_code=400,
        detail="A reserva só pode ser feita com até 7 dias de antecedência",
    )

    reservation_id = str(uuid4())

    reservation = Reservation(
        id=reservation_id,
        user_name=data.user_name,
        parking_lot_id=data.parking_lot_id,
        start_time=data.start_time,
        end_time=data.end_time,
        tolerance_until=data.start_time + timedelta(minutes=15),
        qr_code=f"PARKY-{reservation_id}",
        status=ReservationStatus.RESERVED,
    )

    reservations.append(reservation)
    parking_lot.available_spots -= 1

    return reservation


@app.get("/reservations")
def list_reservations():
    return reservations


@app.get("/reservations/{reservation_id}")
def get_reservation(reservation_id: str):
    reservation = next((r for r in reservations if r.id == reservation_id), None)

    if reservation is None:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")

    return reservation


@app.post("/reservations/{reservation_id}/checkin")
def checkin(reservation_id: str):
    reservation = next((r for r in reservations if r.id == reservation_id), None)

    if reservation is None:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")

    if reservation.status != ReservationStatus.RESERVED:
        raise HTTPException(status_code=400, detail="Reserva não está disponível para check-in")

    now = datetime.now()

    if now > reservation.tolerance_until:
        reservation.status = ReservationStatus.EXPIRED
        raise HTTPException(status_code=400, detail="Tempo de tolerância expirado")

    reservation.status = ReservationStatus.CHECKED_IN

    return {
        "message": "Check-in realizado com sucesso",
        "reservation": reservation,
    }


@app.post("/reservations/{reservation_id}/checkout")
def checkout(reservation_id: str):
    reservation = next((r for r in reservations if r.id == reservation_id), None)

    if reservation is None:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")

    if reservation.status != ReservationStatus.CHECKED_IN:
        raise HTTPException(status_code=400, detail="Reserva não está em check-in")

    reservation.status = ReservationStatus.COMPLETED

    parking_lot = next(
        (lot for lot in parking_lots if lot.id == reservation.parking_lot_id),
        None,
    )

    if parking_lot:
        parking_lot.available_spots += 1

    return {
        "message": "Checkout realizado com sucesso",
        "reservation": reservation,
    }