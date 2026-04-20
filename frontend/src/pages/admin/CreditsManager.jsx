import { Badge, Button, Card, Form, InputGroup, Stack } from 'react-bootstrap';
import { FiCreditCard, FiSearch } from 'react-icons/fi';

function UserRow({ user, isSelected, onSelect }) {
  return (
    <button type="button" className={`admin-list-item admin-user-search-item ${isSelected ? 'is-selected' : ''}`} onClick={() => onSelect(user)}>
      <div>
        <div className="admin-item-title">{user.name}</div>
        <div className="admin-item-subtitle">{user.email}</div>
      </div>
      <Badge bg="dark">{user.credits}</Badge>
    </button>
  );
}

export function CreditsManager({
  t,
  query,
  users,
  loading,
  selectedUser,
  editValue,
  onQueryChange,
  onSelectUser,
  onAssignCredits,
  onSubtractCredits,
  onSetCredits,
  onDeleteCredits,
  onEditValueChange,
}) {
  return (
    <Card className="admin-block h-100 border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div>
            <div className="section-heading mb-2">{t('searchUsers')}</div>
            <div className="admin-block-title">{t('creditsBlockTitle')}</div>
            <div className="class-meta mt-2">{t('creditsBlockSubtitle')}</div>
          </div>
        </div>

        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FiSearch />
          </InputGroup.Text>
          <Form.Control
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t('searchUsersHint')}
          />
        </InputGroup>

        <div className="admin-users-search-results mb-3">
          {loading ? (
            <div className="empty-state admin-empty-tight">...</div>
          ) : users.length === 0 ? (
            <div className="empty-state admin-empty-tight">{t('searchUsersEmpty')}</div>
          ) : (
            users.map((user) => (
              <UserRow key={user.id} user={user} isSelected={selectedUser?.id === user.id} onSelect={onSelectUser} />
            ))
          )}
        </div>

        {selectedUser ? (
          <div className="admin-credit-actions">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Stack direction="horizontal" gap={2}>
                <FiCreditCard />
                <span className="admin-item-title">{selectedUser.name}</span>
              </Stack>
              <Badge bg="success">{t('creditsBalance')}: {selectedUser.credits}</Badge>
            </div>

            <div className="d-flex flex-wrap gap-2 mb-3">
              {[1, 5, 10].map((units) => (
                <Button key={units} variant="outline-dark" className="rounded-pill" size="sm" onClick={() => onAssignCredits(units)}>
                  +{units}
                </Button>
              ))}
              {[1, 5, 10].map((units) => (
                <Button key={`remove-${units}`} variant="outline-secondary" className="rounded-pill" size="sm" onClick={() => onSubtractCredits(units)}>
                  -{units}
                </Button>
              ))}
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <Form.Control
                type="number"
                min={0}
                value={editValue}
                onChange={(event) => onEditValueChange(event.target.value)}
                placeholder={t('creditsSetPlaceholder')}
                className="admin-credit-input"
              />
              <Button variant="dark" className="rounded-pill" size="sm" onClick={onSetCredits}>
                {t('creditsSetAction')}
              </Button>
              <Button variant="outline-danger" className="rounded-pill" size="sm" onClick={onDeleteCredits}>
                {t('creditsDeleteAction')}
              </Button>
            </div>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}
