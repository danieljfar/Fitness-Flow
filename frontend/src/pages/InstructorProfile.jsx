import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { FiArrowLeft, FiCalendar, FiClock, FiMail, FiUser } from 'react-icons/fi';

export function InstructorProfile({ t, instructor, formatDateTime, onBack }) {
  if (!instructor) {
    return null;
  }

  return (
    <section className="instructor-profile-page">
      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
        <Button variant="outline-dark" className="rounded-pill" onClick={onBack}>
          <FiArrowLeft className="me-2" />
          {t('backToClientView')}
        </Button>

        <Badge bg={instructor.status === 'active' ? 'success' : 'secondary'}>{instructor.status || t('statusUnknown')}</Badge>
      </div>

      <Card className="panel-card border-0 mb-4">
        <Card.Body className="p-4 p-lg-5">
          <div className="section-heading mb-2">{t('instructorDetails')}</div>
          <h2 className="instructor-profile-title mb-2">{instructor.name}</h2>
          <p className="class-meta mb-4">{instructor.specialty || t('noSpecialty')}</p>

          <Row className="g-3">
            <Col md={4}>
              <div className="instructor-kpi-card">
                <div className="section-heading mb-2">{t('specialty')}</div>
                <div className="stat-value">{instructor.specialty || t('noSpecialty')}</div>
                <div className="class-meta">
                  <FiUser className="me-2" />
                  {instructor.status || t('statusUnknown')}
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="instructor-kpi-card">
                <div className="section-heading mb-2">{t('classes')}</div>
                <div className="stat-value">{instructor.classes.length}</div>
                <div className="class-meta">
                  <FiUser className="me-2" />
                  {t('instructorClasses')}
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="instructor-kpi-card">
                <div className="section-heading mb-2">{t('classSessions')}</div>
                <div className="stat-value">{instructor.sessions.length}</div>
                <div className="class-meta">
                  <FiCalendar className="me-2" />
                  {t('sessionClasses')}
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="panel-card border-0 h-100">
            <Card.Body className="p-4">
              <div className="section-heading mb-2">{t('bio')}</div>
              <p className="class-meta mb-3">{instructor.bio || t('instructorBioFallback')}</p>
              <div className="class-meta">
                <FiMail className="me-2" />
                {instructor.email || t('emailOptional')}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="panel-card border-0 h-100">
            <Card.Body className="p-4">
              <div className="section-heading mb-3">{t('instructorClasses')}</div>
              {instructor.classes.length === 0 ? (
                <div className="empty-state">{t('noClassesForInstructor')}</div>
              ) : (
                <ListGroup variant="flush" className="reservation-list">
                  {instructor.classes.map((classItem) => (
                    <ListGroup.Item key={classItem.id} className="reservation-row">
                      <div className="class-title mb-1">{classItem.name}</div>
                      <div className="class-meta">
                        {classItem.level} · {classItem.durationMinutes} min
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="panel-card border-0 mt-4">
        <Card.Body className="p-4">
          <div className="section-heading mb-3">{t('upcomingSessions')}</div>
          {instructor.sessions.length === 0 ? (
            <div className="empty-state">{t('noSessionsForInstructor')}</div>
          ) : (
            <div className="featured-class-grid">
              {instructor.sessions.map((session) => (
                <div key={session.id} className="featured-class-card">
                  <div className="class-title mb-1">{session.title || session.class?.name || t('className')}</div>
                  <div className="class-meta mb-2">
                    <FiClock className="me-2" />
                    {session.startsAt ? formatDateTime(session.startsAt) : t('scheduled')}
                  </div>
                  <div className="class-meta">
                    {session.class?.level ? t(session.class.level) : t('statusUnknown')} · {session.class?.durationMinutes || 0} min
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </section>
  );
}
