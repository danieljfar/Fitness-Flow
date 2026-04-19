import { Badge, Button, Card, Col } from 'react-bootstrap';

export function Slots({ t, slots, reservations, formatDateTime, onReserve }) {
  return (
    <Col xl={7}>
      <Card className="panel-card h-100 border-0 shadow-sm">
        <Card.Body className="p-4">
          <div className="section-heading mb-3">{t('sessionSlots')}</div>
          <div className="slot-grid">
            {slots.map((slot) => {
              const isMine = reservations.some((reservation) => reservation.slotId === slot.id && reservation.status === 'active');

              return (
                <div key={slot.id} className={`slot-item ${slot.isFull ? 'full' : ''}`}>
                  <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                    <div>
                      <div className="slot-title">{slot.title}</div>
                      <div className="slot-meta">{formatDateTime(slot.startsAt)}</div>
                      {slot.class?.name ? (
                        <div className="slot-meta">
                          {t('classLabel')}: {slot.class.name}
                        </div>
                      ) : null}
                      {slot.bikeLabel ? (
                        <div className="slot-meta">
                          {t('bikeLabel')}: {slot.bikeLabel}
                        </div>
                      ) : null}
                    </div>
                    <Badge bg={slot.isFull ? 'danger' : 'success'}>{slot.isFull ? t('full') : t('open')}</Badge>
                  </div>

                  <div className="slot-stats mb-3">
                    <span>
                      {slot.availableSeats} {t('seatsLeft')}
                    </span>
                    <span>
                      {slot.bookedCount}/{slot.capacity}
                    </span>
                  </div>

                  <Button
                    variant={isMine ? 'outline-secondary' : 'dark'}
                    className="w-100 rounded-pill"
                    disabled={slot.isFull || isMine}
                    onClick={() => onReserve(slot.id)}
                  >
                    {isMine ? t('reserved') : slot.isFull ? t('soldOut') : t('reserveNow')}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
