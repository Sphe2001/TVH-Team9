import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  MapPin,
  Camera,
  Send,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const AnonymousReport = () => {
  const [formData, setFormData] = useState({
    type: "",
  
    description: "",
    priority: "medium",
  });
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  

  /* ---------- Camera Setup ---------- */
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `camera-${Date.now()}.png`, {
        type: "image/png",
      });
      setImages((prev) => [...prev, file].slice(0, 5));
    }, "image/png");
  };

  const removeImage = (i: number) =>
    setImages((prev) => prev.filter((_, idx) => idx !== i));

  /* ---------- Submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate AI validation
    await new Promise((r) => setTimeout(r, 2000));

    setSubmitting(false);
    setSubmitted(true);

    setTimeout(() => navigate("/"), 3000);
  };

  /* ---------- Success Screen ---------- */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center bg-white rounded-xl shadow-xl p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Report Submitted Successfully
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for helping protect our community infrastructure. Your
            report is being analyzed by our AI system.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              <strong>Reference ID:</strong> RPT-{Date.now().toString().slice(-6)}
            </p>
            <p className="text-green-700 text-sm mt-1">
              AI validation:{" "}
              <span className="font-semibold">Report verified as legitimate</span>
            </p>
          </div>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- Main Form ---------- */
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <Shield className="h-8 w-8" />
            <span className="text-2xl font-bold">SafeGuard Municipal</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Anonymous Report
          </h1>
          <p className="text-gray-600">
            Help us protect our community's infrastructure by reporting incidents
            anonymously.
          </p>
        </div>

        {/* Info Panel */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                AI-Powered Report Validation
              </h3>
              <p className="text-blue-800 text-sm">
                All reports are analyzed by our AI system to verify legitimacy
                and filter out spam.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow-xl rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Incident Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type of Incident *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "theft", label: "Theft/Removal", desc: "Signs or equipment stolen" },
                  { value: "vandalism", label: "Vandalism", desc: "Graffiti or defacement" },
                  { value: "damage", label: "Damage", desc: "Physical damage observed" },
                  { value: "other", label: "Other", desc: "Other infrastructure issues" },
                ].map((type) => (
                  <label
                    key={type.value}
                    className={`border-2 rounded-lg p-4 cursor-pointer ${
                      formData.type === type.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, type: e.target.value }))
                      }
                      className="sr-only"
                      required
                    />
                    <div className="font-medium text-gray-900">{type.label}</div>
                    <div className="text-sm text-gray-600">{type.desc}</div>
                  </label>
                ))}
              </div>
            </div>

           
            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, priority: e.target.value }))
                }
                className="block w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low - Minor issue</option>
                <option value="medium">Medium - Needs attention soon</option>
                <option value="high">High - Urgent, safety risk</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, description: e.target.value }))
                }
                className="block w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Please provide details about what you observed..."
              />
            </div>

            {/* Camera Capture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Take a Picture
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center space-y-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="mx-auto border rounded-lg w-64 h-auto"
                />
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Camera className="mr-2 h-4 w-4" /> Take Picture
                </button>
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>

              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`photo-${i}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>AI Analyzing Report...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Anonymous Report</span>a
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousReport;
