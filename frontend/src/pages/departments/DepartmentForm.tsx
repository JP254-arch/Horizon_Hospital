import { useState, useEffect } from "react";
import axios from "axios";

interface DepartmentFormData {
  name: string;
  code: string;
  description: string;
  isClinical: boolean;
  isActive: boolean;
}

interface Props {
  initialData?: DepartmentFormData & { id?: string };
  onSuccess: () => void; // Callback after successful save
  onCancel: () => void;
}

export default function DepartmentForm({ initialData, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<DepartmentFormData>({
    name: "",
    code: "",
    description: "",
    isClinical: false,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (initialData?.id) {
        // Update existing department
        await axios.put(`/api/departments/${initialData.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new department
        await axios.post("/api/departments", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Department" : "Add Department"}
        </h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Department Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department Code</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isClinical"
              checked={form.isClinical}
              onChange={handleChange}
            />
            <span>Clinical Department</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <span>Active</span>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
