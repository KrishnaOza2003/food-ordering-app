"use client";

import React, { useEffect, useState } from "react";
import AddressInputs from "./AddressInput";
import EditableImage from "./EditableImage";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function UserForm({ user, onSave }) {
  const session = useSession();
  const User = session?.data?.user;

  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }
  const { status } = session;
  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(User?.name);
    }

    if (status === "unauthenticated") {
      return redirect("/login");
    }
  }, [session, status]);

  return (
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={User?.image} setLink={setImage} />
        </div>
      </div>
      <form
        onSubmit={onSave}
        className="grow"
        // onSubmit={(e) =>
        //   onSave(e, {
        //     name: userName,
        //     image,
        //     phone,
        //     admin,
        //     streetAddress,
        //     city,
        //     country,
        //     postalCode,
        //   })
        // }
      >
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={User?.email}
          placeholder={"Email"}
        />
        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserForm;
