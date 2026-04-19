import { Card, Col, Row, Stack } from 'react-bootstrap';
import { FiActivity, FiArrowRight, FiClock, FiLock, FiRefreshCw, FiUsers } from 'react-icons/fi';
import { Instructors } from '../Instructors.jsx';
import { InstructorsManager } from './InstructorsManager.jsx';
import { SlotsManager } from './SlotsManager.jsx';

function StatCard({ icon, label, value }) {
  return (
    <Card className="stat-card h-100">
      <Card.Body>
        <Stack direction="horizontal" gap={3}>
          <div className="stat-icon">{icon}</div>
          <div>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function Dashboard({
  t,
  adminLoading,
  adminMetrics,
  instructorForm,
  setInstructorForm,
  classForm,
  setClassForm,
  slotForm,
  setSlotForm,
  adminInstructors,
  adminClasses,
  adminSlots,
  formatDateTime,
  onCreateInstructor,
  onCreateClass,
  onCreateSlot,
}) {
  return (
    <Row className="g-4 mt-1">
      <Col xs={12}>
        <Card className="panel-card border-0 shadow-sm">
          <Card.Body className="p-4">
            <div className="section-heading mb-3">{t('adminDashboard')}</div>
            <Row className="g-3 mb-4">
              <Col md={4} lg={2}>
                <StatCard icon={<FiUsers />} label={t('users')} value={adminLoading ? '...' : adminMetrics?.users ?? 0} />
              </Col>
              <Col md={4} lg={2}>
                <StatCard icon={<FiActivity />} label={t('instructors')} value={adminLoading ? '...' : adminMetrics?.instructors ?? 0} />
              </Col>
              <Col md={4} lg={2}>
                <StatCard icon={<FiClock />} label={t('classes')} value={adminLoading ? '...' : adminMetrics?.classes ?? 0} />
              </Col>
              <Col md={4} lg={2}>
                <StatCard icon={<FiRefreshCw />} label={t('slots')} value={adminLoading ? '...' : adminMetrics?.slots ?? 0} />
              </Col>
              <Col md={4} lg={2}>
                <StatCard
                  icon={<FiLock />}
                  label={t('activeBookings')}
                  value={adminLoading ? '...' : adminMetrics?.activeBookings ?? 0}
                />
              </Col>
              <Col md={4} lg={2}>
                <StatCard
                  icon={<FiArrowRight />}
                  label={t('occupancy')}
                  value={adminLoading ? '...' : `${adminMetrics?.occupancyRate ?? 0}%`}
                />
              </Col>
            </Row>

            <Row className="g-4">
              <Col lg={4}>
                <InstructorsManager
                  t={t}
                  instructorForm={instructorForm}
                  setInstructorForm={setInstructorForm}
                  onCreateInstructor={onCreateInstructor}
                />
              </Col>

              <SlotsManager
                t={t}
                classForm={classForm}
                setClassForm={setClassForm}
                slotForm={slotForm}
                setSlotForm={setSlotForm}
                adminInstructors={adminInstructors}
                adminClasses={adminClasses}
                adminSlots={adminSlots}
                formatDateTime={formatDateTime}
                onCreateClass={onCreateClass}
                onCreateSlot={onCreateSlot}
              />
            </Row>

            <Row className="g-4 mt-1">
              <Col lg={6}>
                <Instructors t={t} instructors={adminInstructors} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
