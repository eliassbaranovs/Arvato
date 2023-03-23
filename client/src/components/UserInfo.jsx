import { useSelector } from "react-redux";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteUserModal from "./DeleteUserModal";
import NotFound from "./NotFound";
import ExportModule from "./ExportModule";
import { Chip } from "@material-tailwind/react";

function UserInfo(props) {
  //Props
  const { user } = useSelector((state) => state.auth);
  const member = props.member;
  // If user not found, redirect to not found!
  if ((user && user.role !== "admin") || !user) {
    return (
      <>
        <NotFound />
      </>
    );
  }
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow">
      <div className="userinfo p-8">
        <div className="flex items-center mb-2">
          <p className="font-bold text-gray-900 mr-6">{member.name}</p>
          <Chip color="teal" value={member.role} />
        </div>
        <p className="text-gray-700 ">
          <b>E-mail:</b> {member.email}
        </p>
        <p className="text-gray-700 ">
          <b>Team:</b> {member.team}
        </p>
        <p className="text-gray-700 ">
          <b>Created at:</b> {member.createdAt}
        </p>
      </div>
      <div className="flex border-t-2 divide-x-2">
        <ChangePasswordModal member={member} />
        <DeleteUserModal member={member} />
        <ExportModule
          member={member}
          fileName={"Excel Report_" + member.name}
        />
      </div>
    </div>
  );
}

export default UserInfo;
