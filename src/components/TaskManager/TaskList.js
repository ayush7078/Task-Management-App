import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { List, Button, Modal, Form, Input, message, Tooltip, Switch } from 'antd';

const TaskList = () => {
  const { tasks, updateTask, deleteTask, addTask } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentTask, setCurrentTask] = useState(null);

  const showAddTaskModal = () => {
    setCurrentTask(null); // Clear the current task
    form.resetFields(); // Reset form fields
    setIsModalVisible(true);
  };

  const showUpdateTaskModal = (task) => {
    setCurrentTask(task); // Set the current task to be updated
    form.setFieldsValue(task); // Pre-fill the form with task data
    setIsModalVisible(true);
  };

  const handleComplete = async (task) => {
    const updatedTask = { ...task, completed: !task.completed }; // Toggle completed status
    try {
      await updateTask(task.id, updatedTask);
      message.success('Task updated successfully');
    } catch (error) {
      message.error('Failed to update task');
    }
  };

  const handleAddOrUpdateTask = async (values) => {
    if (currentTask) {
      // Update task logic
      const updatedTask = { id: currentTask.id, ...values, completed: currentTask.completed };
      try {
        await updateTask(currentTask.id, updatedTask);
        message.success('Task updated successfully');
      } catch (error) {
        message.error('Failed to update task');
      }
    } else {
      // Add task logic
      const newTask = { id: Date.now(), ...values, completed: false };
      try {
        await addTask(newTask);
        message.success('Task added successfully');
      } catch (error) {
        message.error('Failed to add task');
      }
    }

    form.resetFields(); // Reset the form fields
    setIsModalVisible(false); // Close the modal
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Task List</h2>
      <Button type="primary" onClick={showAddTaskModal} style={{ marginBottom: '20px' }}>
        Add Task
      </Button>
      <List
        bordered
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item>
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </h3>
              <p>{task.description}</p>
            </div>
            <Tooltip title={task.completed ? 'Mark as incomplete' : 'Mark as completed'}>
              <Switch
                checked={task.completed}
                onChange={() => handleComplete(task)}
                style={{ marginRight: '10px' }}
              />
            </Tooltip>
            <Button onClick={() => showUpdateTaskModal(task)} style={{ marginRight: '10px' }}>
              Update
            </Button>
            <Button onClick={() => deleteTask(task.id)} danger>
              Delete
            </Button>
          </List.Item>
        )}
      />

      {/* Add/Update Task Modal */}
      <Modal
        title={currentTask ? "Update Task" : "Add New Task"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdateTask}>
          <Form.Item
            label="Task Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the task title' }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>
          <Form.Item
            label="Task Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the task description' }]}
          >
            <Input.TextArea placeholder="Enter task description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentTask ? "Update Task" : "Add Task"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskList;
