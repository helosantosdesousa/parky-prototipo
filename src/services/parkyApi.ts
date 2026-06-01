const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export type ParkingLot = {
  id: number;
  name: string;
  address: string;
  total_spots: number;
  available_spots: number;
  price_per_hour: number;
};

export type Reservation = {
  id: string;
  user_name: string;
  parking_lot_id: number;
  start_time: string;
  end_time: string;
  tolerance_until: string;
  qr_code: string;
  status: string;
};

export type ReservationPayload = {
  user_name: string;
  parking_lot_id: number;
  start_time: string;
  end_time: string;
};

export async function getParkingLots(): Promise<ParkingLot[]> {
  const response = await fetch(`${API_URL}/parking-lots`);

  if (!response.ok) {
    throw new Error("Erro ao buscar estacionamentos");
  }

  return response.json();
}

export async function getParkingLotById(id: string): Promise<ParkingLot> {
  const response = await fetch(`${API_URL}/parking-lots/${id}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do estacionamento");
  }

  return response.json();
}

export async function getReservations(): Promise<Reservation[]> {
  const response = await fetch(`${API_URL}/reservations`);

  if (!response.ok) {
    throw new Error("Erro ao buscar reservas");
  }

  return response.json();
}

export async function createReservation(
  payload: ReservationPayload
): Promise<Reservation> {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Erro ao criar reserva";

    try {
    const error = await response.json();
    message = error.detail ?? message;
  } catch {
    message = `Erro ${response.status}: ${response.statusText}`;
  }

  throw new Error(message);
}

  return response.json();
}

export async function checkInReservation(reservationId: string) {
  const response = await fetch(
    `${API_URL}/reservations/${reservationId}/checkin`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Erro ao fazer check-in");
  }

  return response.json();
}

export async function checkOutReservation(reservationId: string) {
  const response = await fetch(
    `${API_URL}/reservations/${reservationId}/checkout`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Erro ao fazer checkout");
  }

  return response.json();
}