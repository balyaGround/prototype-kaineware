import React, { useState } from 'react';
import { Container, Card, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';

const dummyUsers = [
  { id: 1, nama: 'Owner', email: 'owner@example.com', role: 'owner', gudang: ['Cideng', 'AA17', 'A38'] },
  { id: 2, nama: 'Admin A', email: 'adminA@example.com', role: 'admin', gudang: ['AA17'] },
  { id: 3, nama: 'Kasir 1', email: 'kasir1@example.com', role: 'kasir', gudang: ['Cideng'] },
];

const User = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nama: '',
    email: '',
    role: 'kasir',
    gudang: [],
  });

  const toggleGudang = (g) => {
    const gudang = newUser.gudang.includes(g)
      ? newUser.gudang.filter((x) => x !== g)
      : [...newUser.gudang, g];
    setNewUser({ ...newUser, gudang });
  };

  const handleSave = () => {
    const id = users.length + 1;
    setUsers([...users, { id, ...newUser }]);
    setShowModal(false);
    setNewUser({ nama: '', email: '', role: 'kasir', gudang: [] });
  };

  return (
    <Container>
      <h2 className="mb-4">👤 Manajemen User</h2>

      <Card className="mb-3">
        <Card.Body className="d-flex justify-content-end">
          <Button onClick={() => setShowModal(true)}>+ Tambah User</Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Gudang Akses</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.nama}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.gudang.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah User Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                value={newUser.nama}
                onChange={(e) => setNewUser({ ...newUser, nama: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="kasir">Kasir</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Akses Gudang</Form.Label>
              <Row>
                {['Cideng', 'AA17', 'A38'].map((g) => (
                  <Col key={g} xs={6}>
                    <Form.Check
                      type="checkbox"
                      label={g}
                      checked={newUser.gudang.includes(g)}
                      onChange={() => toggleGudang(g)}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
          <Button variant="primary" onClick={handleSave}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default User;
