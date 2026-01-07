import { FaTruck, FaTimes } from "react-icons/fa";

export default function ConsignmentViewModal({ consignment, onClose }) {
  const data = consignment?.[0];

  if (!data) return null;

  return (
    <>
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-2xl rounded-2xl w-full max-w-4xl p-6 animate-fadeIn scale-100">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <FaTruck className="text-blue-600 w-6 h-6" />
            <h2 className="text-xl font-bold tracking-wide">
              Consignment Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-500 hover:text-white transition"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <section>
            <h3 className="font-semibold text-lg mb-2">Primary Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <p>
                Supplier: <b>{data.supplier_name}</b>
              </p>
              <p>
                District: <b>{data.destination_district}</b>
              </p>
              <p>
                Block: <b>{data.destination_block}</b>
              </p>
              <p>
                Delivery Location:{" "}
                <b>{data.delivery_location?.toUpperCase()}</b>
              </p>
              <p>
                Consignment Date: <b>{data.consignment_date}</b>
              </p>
              <p>
                Tracking ID: <b>{data.tracking_no}</b>
              </p>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">Shipping Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <p>
                Truck No: <b>{data.truck_no?.toUpperCase()}</b>
              </p>
              <p>
                Driver: <b>{data.driver_name?.toUpperCase()}</b>
              </p>
              <p>
                Driver Mobile: <b>{data.driver_mobile_no}</b>
              </p>
              <p>
                Alt Mobile: <b>{data.driver_alt_mob_no}</b>
              </p>
              <p>
                Qty Boys: <b>{data.qty_boys}</b>
              </p>
              <p>
                Qty Girls: <b>{data.qty_girls}</b>
              </p>
            </div>
          </section>

          {data.actual_arrival_date && (
            <section>
              <h3 className="font-semibold text-lg mb-2">Unloading Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <p>
                  Arrived On: <b>{data.actual_arrival_date}</b>
                </p>
                <p>
                  Unloaded On: <b>{data.unloading_date}</b>
                </p>
                <p>
                  Unload Dist: <b>{data.unload_dist?.toUpperCase()}</b>
                </p>
                <p>
                  Unload Block: <b>{data.unload_block?.toUpperCase()}</b>
                </p>
                <p>
                  Unload Point: <b>{data.unload_point?.toUpperCase()}</b>
                </p>
              </div>
            </section>
          )}

          <section>
            <h3 className="font-semibold text-lg mb-2">Other Details</h3>
            <p className="text-sm">
              Publish Status:{" "}
              <b>{data.lock_consignment === 1 ? "Published" : "Pending"}</b>
            </p>
          </section>

          {/* Footer */}
          <div className="flex justify-center gap-3 pt-4 border-t border-gray-300 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
