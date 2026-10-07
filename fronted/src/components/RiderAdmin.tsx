import axios from "axios";
import { adminService } from "../main";
import toast from "react-hot-toast";

const RiderAdmin = ({
  rider,
  onVerify,
}: {
  rider: any;
  onVerify: () => void;
}) => {
  const verify = async () => {
    try {
      await axios.patch(
        `${adminService}/api/v1/verify/restaurant/${rider._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Restaurant verified");
      onVerify();
    } catch (error) {
      toast.error("failed to verify restaurant");
    }
  };
  return (
    <div className="rounded-xl bg-white p-4 shadow space-y-2">
      <img
        src={rider.picture}
        className="h-40 w-full object-cover rounded"
        alt=""
      />
      <h3>{rider.phone}</h3>
      <p className="text-sm text-gray-500">Adhar: {rider.adharNumber}</p>
      <p>Dl Number: {rider.drivingLicenseNumber}</p>

      <button
        className="w-full rounded bg-green-500 text-white hover:bg-green-600"
        onClick={verify}
      >
        Verify Rider
      </button>
    </div>
  );
};

export default RiderAdmin;
