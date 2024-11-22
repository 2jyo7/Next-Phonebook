import UpdatePhNum from "@/components/UpdatePhNum ";
import React from "react";

const UpdatePHPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div>
      <UpdatePhNum id={id} />
    </div>
  );
};

export default UpdatePHPage;
