from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Booking
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()

class BookingCreate(BaseModel):
    name: str
    date: str
    time: str
    guests: int

class BookingOut(BaseModel):
    id: int
    name: str
    date: str
    time: str
    guests: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/bookings/", response_model=BookingOut)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    db_booking = Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@app.get("/bookings/", response_model=List[BookingOut])
def get_bookings(db: Session = Depends(get_db)):
    return db.query(Booking).all()


@app.delete("/bookings/{booking_id}", response_model=BookingOut)
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(booking)
    db.commit()
    return booking