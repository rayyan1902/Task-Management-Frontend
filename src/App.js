import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1 className="mt-4 mb-3">Task Management Application</h1>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </Form.Group>

            <Button variant="primary" onClick={addTask}  style={{ marginTop: '10px' }}>
              Add Task
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <h3>Task List</h3>
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item key={task._id}>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <Button
                  variant={task.status === 'Completed' ? 'success' : 'info'}
                  className="mr-2"
                  onClick={() =>
                    updateTaskStatus(
                      task._id,
                      task.status === 'Completed'
                        ? 'Incomplete'
                        : 'Completed'
                    )
                  }
                >
                  {task.status === 'Completed' ? 'Completed' : 'Incomplete'}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteTask(task._id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
