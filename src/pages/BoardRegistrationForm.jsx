import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const BoardsManagement = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      boardName: "Tech Board",
      description: "Board for technology discussions",
      isActive: true,
    },
    {
      id: 2,
      boardName: "Science Board",
      description: "Board for scientific discussions",
      isActive: false,
    },
  ]);

  const [boardData, setBoardData] = useState({
    boardName: "",
    description: "",
    isActive: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBoardData({ ...boardData, [name]: type === "checkbox" ? checked : value });
  };

  const openAddModal = () => {
    setBoardData({ boardName: "", description: "", isActive: false });
    setEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (board) => {
    setBoardData(board);
    setEditMode(true);
    setShowModal(true);
  };

  const saveBoard = () => {
    if (editMode) {
      setBoards(
        boards.map((b) => (b.id === boardData.id ? { ...boardData } : b))
      );
    } else {
      setBoards([...boards, { ...boardData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const deleteBoard = (id) => {
    setBoards(boards.filter((board) => board.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Boards Management</h1>
      <button className="btn btn-primary mb-3" onClick={openAddModal}>
        Add Board
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Board Name</th>
            <th>Description</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <tr key={board.id}>
              <td>{board.boardName}</td>
              <td>{board.description}</td>
              <td>{board.isActive ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => openEditModal(board)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteBoard(board.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode ? "Edit Board" : "Add Board"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Board Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="boardName"
                      value={boardData.boardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={boardData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="isActive"
                      checked={boardData.isActive}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveBoard}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardsManagement;
