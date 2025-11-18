import React, { useEffect, useState } from "react";
import "../App.css";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Modal, Button } from "antd";

function DocumentList({ refreshTrigger, viewMode }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [updatedBy, setUpdatedBy] = useState("");
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [previewDoc, setPreviewDoc] = useState(null);
  const [deleteDoc, setDeleteDoc] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) setRole(storedRole);
  }, []);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/documents");
      const data = await res.json();
      setDocs(data);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  useEffect(() => {
    fetchDocs();
  }, [refreshTrigger]);

  const filtered = docs.filter((doc) =>
    doc.originalname.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = async (docId) => {
    if (role === "Viewer") return;
    const formData = new FormData();
    if (newFile) formData.append("file", newFile);
    formData.append("updatedBy", updatedBy);

    try {
      const res = await fetch(`http://localhost:5000/documents/${docId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        await fetchDocs();
        setEditId(null);
        setNewFile(null);
        setUpdatedBy("");
      } else {
        alert("Failed to update the document.");
      }
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDoc) return;
    try {
      const res = await fetch(
        `http://localhost:5000/documents/${deleteDoc._id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        await fetchDocs();
      } else {
        alert("Failed to delete the document.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleteDoc(null);
    }
  };

  const getFileDownloadUrl = (id) =>
    `http://localhost:5000/documents/download/${id}`;

  const getFilePreviewUrl = (filename) =>
    `http://localhost:5000/uploads/${filename}`;

  const isPreviewable = (name) => /\.(jpg|jpeg|png|gif|pdf|webp)$/i.test(name);

  const handlePreview = (doc) => {
    if (isPreviewable(doc.originalname)) {
      setPreviewDoc(doc);
    } else {
      window.open(getFileDownloadUrl(doc._id), "_blank");
    }
  };

  return (
    <div className="container">
      <h3>
        Document List{" "}
        <span className="meta">({role || "No Role Selected"})</span>
      </h3>

      <p className="role-description">
        {role === "Viewer" && (
          <>
            As a <b>Viewer</b>, you can preview and download records.
          </>
        )}
        {role === "Member" && (
          <>
            As a <b>Member</b>, you can download and edit records. You can make
            changes and upload the updated file using the Edit option.
          </>
        )}
        {role === "Admin" && (
          <>
            As an <b>Admin</b>, you can add new records from above Upload Form,
            download and edit existing records, make changes, and upload the
            updated file using the Edit option.
          </>
        )}
        {!role && <>Please select a role to see available actions.</>}
      </p>

      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by file name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No documents found.</p>
      ) : viewMode === "list" ? (
        // LIST VIEW
        <ul className="list">
          {filtered.map((doc, idx) => (
            <li key={doc._id || idx} className="list-item">
              <div className="list-row">
                <div className="col file-col">
                  <b>
                    <span
                      onClick={() => handlePreview(doc)}
                      className="file-link"
                      style={{ cursor: "pointer", color: "#1677ff" }}
                      title={`Preview ${doc.originalname}`}
                    >
                      {doc.originalname}
                    </span>
                  </b>
                </div>

                <div className="col uploaded-col">
                  <small>
                    Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                  </small>
                </div>

                <div className="col actions-col">
                  {(role === "Admin" || role === "Member") && (
                    <button
                      className="btn btn-ghost"
                      onClick={() => setEditId(doc._id)}
                    >
                      <EditOutlined style={{ fontSize: 16, marginRight: 6 }} />
                      Edit
                    </button>
                  )}
                  {role === "Admin" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => setDeleteDoc(doc)}
                    >
                      <DeleteOutlined
                        style={{ fontSize: 16, marginRight: 6 }}
                      />
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {editId === doc._id && (
                <form
                  className="edit-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(doc._id);
                  }}
                >
                  <input
                    className="file"
                    type="file"
                    onChange={(e) => setNewFile(e.target.files[0])}
                  />
                  <div className="actions">
                    <button className="btn btn-primary" type="submit">
                      <SaveOutlined style={{ marginRight: 6 }} /> Save
                    </button>
                    <button
                      className="btn btn-ghost"
                      type="button"
                      onClick={() => setEditId(null)}
                    >
                      <CloseOutlined style={{ marginRight: 6 }} /> Cancel
                    </button>
                  </div>
                </form>
              )}
            </li>
          ))}
        </ul>
      ) : (
        // GRID VIEW (unchanged)
        <div className="file-grid">
          {filtered.map((doc) => (
            <div
              key={doc._id}
              className="file-card"
              onClick={() => handlePreview(doc)}
              style={{ cursor: "pointer" }}
            >
              {/\.(jpg|jpeg|png|gif|webp)$/i.test(doc.originalname) ? (
                <img
                  src={getFilePreviewUrl(doc.filename)}
                  alt={doc.originalname}
                  className="file-thumb"
                />
              ) : (
                <div className="file-icon">
                  {doc.originalname.endsWith(".pdf") ? "📄" : "📁"}
                </div>
              )}

              <div className="file-info">
                <p className="file-name">{doc.originalname}</p>
                <p className="file-date">
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="file-actions">
                {(role === "Admin" || role === "Member") && (
                  <button
                    className="btn btn-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditId(doc._id);
                    }}
                  >
                    <EditOutlined style={{ color: "blue" }} />
                  </button>
                )}
                {role === "Admin" && (
                  <button
                    className="btn btn-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteDoc(doc);
                    }}
                  >
                    <DeleteOutlined style={{ color: "red" }} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!deleteDoc}
        onCancel={() => setDeleteDoc(null)}
        onOk={handleDeleteConfirm}
        okText="Delete"
        okButtonProps={{ danger: true }}
        title={
          <>
            <ExclamationCircleOutlined
              style={{ color: "red", marginRight: 8 }}
            />
            Confirm Delete
          </>
        }
        centered
      >
        <p>
          Are you sure you want to delete <b>{deleteDoc?.originalname}</b>? This
          action cannot be undone.
        </p>
      </Modal>

      <Modal
        open={!!previewDoc}
        onCancel={() => setPreviewDoc(null)}
        footer={[
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() =>
              window.open(getFileDownloadUrl(previewDoc._id), "_blank")
            }
          >
            Download
          </Button>,
          <Button key="close" onClick={() => setPreviewDoc(null)}>
            Close
          </Button>,
        ]}
        width={800}
        centered
        title={previewDoc?.originalname}
      >
        {previewDoc && (
          <>
            {/\.(jpg|jpeg|png|gif|webp)$/i.test(previewDoc.originalname) ? (
              <img
                src={getFilePreviewUrl(previewDoc.filename)}
                alt={previewDoc.originalname}
                style={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            ) : previewDoc.originalname.endsWith(".pdf") ? (
              <iframe
                src={getFilePreviewUrl(previewDoc.filename)}
                title="PDF Preview"
                style={{
                  width: "100%",
                  height: "70vh",
                  border: "none",
                }}
              />
            ) : (
              <p>Preview not available for this file type.</p>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

export default DocumentList;
