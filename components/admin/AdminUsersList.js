// import { Delete } from "@mui/icons-material";
// import React from "react";
// import { useSnackbar } from "notistack";
// import axios from "axios";

// const AdminUsersList = ({ item }) => {
//   const { enqueueSnackbar } = useSnackbar();

//   const handleDelete = async () => {
//     const token = window.localStorage.getItem("token");
//     await axios
//       .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${item.id_nd}`, {
//         headers: { Authorization: token },
//       })
//       .then((data) => {
//         enqueueSnackbar(data.data.message, {
//           variant: "success",
//           autoHideDuration: 3000,
//         });
//       })
//       .catch((err) => {
//         enqueueSnackbar(err.response.data.message, {
//           variant: "error",
//           autoHideDuration: 3000,
//         });
//       });
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center p-3 bg-gray-600 w-[18rem] md:w-[20rem] lg:w-[25rem]  rounded-xl mb-3">
//         <h1 className="text-green-100 font-semibold">{item.username}</h1>
//         <h1 className="text-green-100 font-semibold">{item.email}</h1>
//         <div>
//           <Delete
//             onClick={handleDelete}
//             className="text-green-400 cursor-pointer"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminUsersList;
import { Delete } from "@mui/icons-material";
import React from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

const AdminUsersList = ({ item, onDelete }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      enqueueSnackbar("Token không hợp lệ", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    if (!item.id) {
      enqueueSnackbar("ID người dùng không hợp lệ", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }
    console.log("Deleting user with ID:", item.id); 

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      enqueueSnackbar("Người dùng đã được xóa thành công", {
        variant: "success",
        autoHideDuration: 3000,
      });
      onDelete(item.id_nd); // Gọi hàm onDelete để cập nhật danh sách người dùng
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Lỗi khi xóa người dùng", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div className="flex justify-between items-center p-3 bg-gray-600 w-[18rem] md:w-[20rem] lg:w-[25rem] rounded-xl mb-3">
      <h1 className="text-green-100 font-semibold">{item.username}</h1>
      <h1 className="text-green-100 font-semibold">{item.email}</h1>
      <div>
        <Delete
          onClick={handleDelete}
          className="text-green-400 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AdminUsersList;


