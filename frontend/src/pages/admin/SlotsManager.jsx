import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';

export function SlotsManager({
  t,
  classForm,
  setClassForm,
  slotForm,
  setSlotForm,
  adminInstructors,
  adminClasses,
  adminSlots,
  formatDateTime,
  onCreateClass,
  onCreateSlot,
}) {
  return (
    <>
      <Col lg={4}>
        <Card className="h-100 border-0 bg-light">
          <Card.Body>
            <div className="section-heading mb-3">{t('createClass')}</div>
            <Form onSubmit={onCreateClass}>
              <Form.Group className="mb-2">
                <Form.Control
                  placeholder={t('className')}
                  value={classForm.name}
                  onChange={(event) => setClassForm((current) => ({ ...current, name: event.target.value }))}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Select
                  value={classForm.instructorId}
                  onChange={(event) => setClassForm((current) => ({ ...current, instructorId: event.target.value }))}
                >
                  <option value="">{t('selectInstructor')}</option>
                  {adminInstructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Row className="g-2 mb-2">
                <Col>
                  <Form.Select
                    value={classForm.level}
                    onChange={(event) => setClassForm((current) => ({ ...current, level: event.target.value }))}
                  >
                    <option value="beginner">{t('beginner')}</option>
                    <option value="intermediate">{t('intermediate')}</option>
                    <option value="advanced">{t('advanced')}</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    min={15}
                    value={classForm.durationMinutes}
                    onChange={(event) => setClassForm((current) => ({ ...current, durationMinutes: event.target.value }))}
                  />
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder={t('description')}
                  value={classForm.description}
                  onChange={(event) => setClassForm((current) => ({ ...current, description: event.target.value }))}
                />
              </Form.Group>
              <Button type="submit" variant="dark" className="w-100 rounded-pill">
                {t('saveClass')}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={4}>
        <Card className="h-100 border-0 bg-light">
          <Card.Body>
            <div className="section-heading mb-3">{t('createSlot')}</div>
            <Form onSubmit={onCreateSlot}>
              <Form.Group className="mb-2">
                <Form.Select
                  value={slotForm.classId}
                  onChange={(event) => setSlotForm((current) => ({ ...current, classId: event.target.value }))}
                >
                  <option value="">{t('selectClass')}</option>
                  {adminClasses.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="datetime-local"
                  value={slotForm.startsAt}
                  onChange={(event) => setSlotForm((current) => ({ ...current, startsAt: event.target.value }))}
                />
              </Form.Group>
              <Row className="g-2 mb-2">
                <Col>
                  <Form.Control
                    placeholder={t('bikeLabel')}
                    value={slotForm.bikeLabel}
                    onChange={(event) => setSlotForm((current) => ({ ...current, bikeLabel: event.target.value }))}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    min={1}
                    value={slotForm.capacity}
                    onChange={(event) => setSlotForm((current) => ({ ...current, capacity: event.target.value }))}
                  />
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Control
                  placeholder={t('titleOptional')}
                  value={slotForm.title}
                  onChange={(event) => setSlotForm((current) => ({ ...current, title: event.target.value }))}
                />
              </Form.Group>
              <Button type="submit" variant="dark" className="w-100 rounded-pill">
                {t('saveSlot')}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={4}>
        <div className="section-heading mb-2">{t('classesAndSlots')}</div>
        <ListGroup>
          {adminSlots.map((slot) => (
            <ListGroup.Item key={slot.id}>
              <div className="slot-title">{slot.class?.name || slot.title}</div>
              <div className="slot-meta">{formatDateTime(slot.startsAt)}</div>
              <div className="slot-meta">
                {slot.bikeLabel ? `${t('bikeLabel')} ${slot.bikeLabel} • ` : ''}
                {slot.bookedCount}/{slot.capacity} {t('booked')}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </>
  );
}
