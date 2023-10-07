import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions/user";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { PiNotePencilFill, PiNotePencilLight } from "react-icons/pi";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { roleData } from "../../static/data";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllUsers());
  };

  const handleUpdateRole = async () => {
  
    await axios
      .put(
        `${server}/user/update-user-role`,
        { role },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Update role successfully!");
        window.location.reload();
      });

    dispatch(getAllUsers());
  };
  
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "  ",
      flex: 1,
      minWidth: 150,
      headerName: "Update role",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setUserId(params.id) || setSelectedRole(params.row.role) || setOpenUpdate(true)}
            >
              <PiNotePencilFill color="white" size={20} />
            </Button>
          </>
        );
      },
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setUserId(params.id) || setOpen(true)}
            >
              <AiOutlineDelete color="white" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  users &&
    users.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
        {openUpdate && (
          //    <form
          //    aria-aria-required={true}
          //    className="flex flex-col items-center"
          //    onSubmit={handleUpdateRole}
          //  >
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpenUpdate(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Change role user
              </h3>
              <div>
                <label className="pb-2">
                  Role user <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Choose a role">{selectedRole}</option>
                  {roleData &&
                    roleData.map((i) => (
                      <option value={i.role} key={i.role}>
                        {i.role}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpenUpdate(false) || handleUpdateRole(userId)}
                >
                  Update role
                  {/* <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
                    <input
                      type="submit"
                      value="Update role"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      readOnly
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          // </form>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
