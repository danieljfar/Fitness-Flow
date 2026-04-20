import { useMemo, useState } from 'react';
import { Row } from 'react-bootstrap';
import { Home } from './Home.jsx';
import { Classes } from './Classes.jsx';
import { Profile } from './Profile.jsx';
import { InstructorProfile } from './InstructorProfile.jsx';

export function ClientView({
  t,
  user,
  classes,
  reservations,
  totalSeats,
  liveClasses,
  totalReservations,
  booting,
  featuredClasses,
  highlightedInstructors,
  instructors,
  formatDateTime,
  token,
  onReserve,
  onCancel,
  onOpenAuthModal,
}) {
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);

  const selectedInstructor = useMemo(
    () => instructors.find((instructor) => instructor.id === selectedInstructorId) || null,
    [instructors, selectedInstructorId]
  );

  function handleSelectInstructor(instructor) {
    if (!instructor?.id) {
      return;
    }
    setSelectedInstructorId(instructor.id);
  }

  function handleBackToClient() {
    setSelectedInstructorId(null);
  }

  if (selectedInstructor) {
    return (
      <InstructorProfile
        t={t}
        instructor={selectedInstructor}
        formatDateTime={formatDateTime}
        onBack={handleBackToClient}
      />
    );
  }

  return (
    <>
      <Home
        t={t}
        user={user}
        classesCount={classes.length}
        totalSeats={totalSeats}
        liveClasses={liveClasses}
        totalReservations={totalReservations}
        booting={booting}
        featuredClasses={featuredClasses}
        highlightedInstructors={highlightedInstructors}
        formatDateTime={formatDateTime}
        onSelectInstructor={handleSelectInstructor}
      />

      <section className="client-section-intro panel-card border-0 mb-4">
        <h2 className="client-section-title mb-2">{t('clientWorkspaceTitle')}</h2>
        <p className="class-meta mb-0">{t('clientWorkspaceSubtitle')}</p>
      </section>

      <Row className="g-4 client-content-grid">
        <Classes t={t} classes={classes} reservations={reservations} formatDateTime={formatDateTime} onReserve={onReserve} />
        <Profile
          t={t}
          token={token}
          reservations={reservations}
          formatDateTime={formatDateTime}
          onOpenAuthModal={onOpenAuthModal}
          onCancel={onCancel}
        />
      </Row>
    </>
  );
}
