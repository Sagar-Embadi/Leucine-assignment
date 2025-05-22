import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import SoftwareDetailCard from "./SoftwareDetailCard";
const statusColors = {
  Approved: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

export default function SoftwareRequestCard({ request }) {
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState({});
  const handleClose = () => setShow(false);
  return (
    <>
      <div
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-100 hover:shadow-xl transition-transform hover:scale-[1.015]"
        onClick={() => {setShow(true); setShowDetail(request);console.log(request);
        }}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-gray-900 leading-tight">
            {request.software.name}
          </h3>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${
              statusColors[request.status] || "bg-gray-200 text-gray-700"
            }`}
          >
            {request.status}
          </span>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-5">
          {request.software.description.slice(0, 300)}
        </p>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Accepted Software</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SoftwareDetailCard
            name={showDetail.software?.name}
            description={showDetail.software?.description}
            status={showDetail.status}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
