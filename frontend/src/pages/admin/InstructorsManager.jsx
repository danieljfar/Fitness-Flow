import { Button, Card, Form } from 'react-bootstrap';

export function InstructorsManager({ t, instructorForm, setInstructorForm, onCreateInstructor }) {
  return (
    <Card className="h-100 border-0 bg-light">
      <Card.Body>
        <div className="section-heading mb-3">{t('createInstructor')}</div>
        <Form onSubmit={onCreateInstructor}>
          <Form.Group className="mb-2">
            <Form.Control
              placeholder={t('authName')}
              value={instructorForm.name}
              onChange={(event) => setInstructorForm((current) => ({ ...current, name: event.target.value }))}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              placeholder={t('emailOptional')}
              value={instructorForm.email}
              onChange={(event) => setInstructorForm((current) => ({ ...current, email: event.target.value }))}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              placeholder={t('specialty')}
              value={instructorForm.specialty}
              onChange={(event) => setInstructorForm((current) => ({ ...current, specialty: event.target.value }))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={2}
              placeholder={t('bio')}
              value={instructorForm.bio}
              onChange={(event) => setInstructorForm((current) => ({ ...current, bio: event.target.value }))}
            />
          </Form.Group>
          <Button type="submit" variant="dark" className="w-100 rounded-pill">
            {t('saveInstructor')}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
