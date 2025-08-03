import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const nama = currentUser?.displayName || currentUser?.email || "User";
  const role = currentUser?.role || "role tidak diketahui";
  const jam = dayjs().tz("Asia/Jakarta").hour();

  let greet = "Selamat Malam";
  if (jam >= 5 && jam < 12) greet = "Selamat Pagi";
  else if (jam >= 12 && jam < 16) greet = "Selamat Siang";
  else if (jam >= 16 && jam < 19) greet = "Selamat Sore";

  return (
    <div className="d-flex justify-content-between align-items-center bg-info border-bottom px-4 py-3 shadow-sm mb-5">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => navigate(-1)}
        >
          ⬅ Kembali
        </button>
        <h5 className="mb-0">📊 Dashboard KaineWare</h5>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="text-end">
          <div className="fw-semibold">
            {greet}, {nama} 👋
          </div>
          <small className="text-muted text-capitalize">{role}</small>
        </div>
        <img
          src={`https://ui-avatars.com/api/?name=${nama}&background=random`}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-circle"
        />
        <button className="btn btn-sm btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
