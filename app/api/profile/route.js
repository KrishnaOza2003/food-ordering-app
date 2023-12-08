import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

mongoose.connect(process.env.MONGO_URL);

export async function PUT(req) {
  try {
    const data = await req.json(); // Wait for the promise to resolve
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    console.log('name' in data);

    if ("name" in data) {
      // Update the user's name in the database using mongoose or your preferred method
      // For example, assuming you have a User model:
      // await User.updateOne({ _id: session.userId }, { name: data.name });
      
      const result = await User.updateOne({email}, {name: data.name});
      console.log({email, update: {name: data.name}, result});
    }

    return Response.json({
      status: 200,
      body: { success: true },
    });
  } catch (error) {
    console.error("Error in PUT:", error);
    return Response.json({
      status: 500,
      body: { error: "Internal Server Error" },
    });
  }
}

// export default async function handler(req, res) {
//   if (req.method === "PUT") {
//     return handlePUT(req, res);
//   } else if (req.method === "GET") {
//     return handleGET(req, res);
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }

// async function handlePUT(req, res) {
//   try {
//     const session = await getSession({ req });

//     if (!session) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const data = await req.body;
//     const { _id, name, image, ...otherUserInfo } = data;

//     let filter = {};
//     if (_id) {
//       filter = { _id };
//     } else {
//       const email = session.user.email;
//       filter = { email };
//     }

//     const user = await User.findOne(filter);
//     await User.updateOne(filter, { name, image });
//     await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
//       upsert: true,
//     });

//     res.json(true);
//   } catch (error) {
//     console.error("PUT error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function handleGET(req, res) {
//   try {
//     const session = await getSession({ req });

//     if (!session) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const url = new URL(req.url);
//     const _id = url.searchParams.get("_id");

//     let filterUser = {};
//     if (_id) {
//       filterUser = { _id };
//     } else {
//       const email = session?.user?.email;
//       if (!email) {
//         return res.json({});
//       }
//       filterUser = { email };
//     }

//     const user = await User.findOne(filterUser).lean();
//     const userInfo = await UserInfo.findOne({ email: user.email }).lean();

//     res.json({ ...user, ...userInfo });
//   } catch (error) {
//     console.error("GET error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
