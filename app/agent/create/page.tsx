"use client";

// 上传文件的话就从做成一个单独的API
// 然后这个API返回文件的id
// 然后我们在创建智能体的API里面传入这个文件的id即可
// 这样比较灵活

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import Dropzone, { useDropzone } from "react-dropzone";
import { CreateAgentForm } from "@/app/ui/agent/create/create-agent-form";

// interface CreateBotFormData {
//   name: string;
//   description: string;
//   knowledges: string[];
// }

// class Knowledge {
//   filename: string;
//   id: string;

//   constructor({ filename, id }: { filename: string; id: string }) {
//     this.filename = filename;
//     this.id = id;
//   }
// }

// // 封装一下后端的API调用
// async function createBot(data: CreateBotFormData, knowledges: Knowledge[]) {
//   const response = await fetch("http://localhost:8000/api/agent/create", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       ...data,
//       knowledges: knowledges.map((knowledge) => knowledge.id),
//     }),
//   });
//   const json = await response.json();
//   console.log(json);
// }

// async function uploadFile(file: File) {
//   const response = await fetch(
//     "http://localhost:8000/api/knowledge/upload-file",
//     {
//       method: "POST",
//       body: file,
//     }
//   );
// }

// // https://react-dropzone.js.org/
// // https://austingil.com/uploading-files-with-html/
// function Basic({
//   knowledges,
//   setKnowledges,
// }: {
//   knowledges: Knowledge[];
//   setKnowledges: React.Dispatch<React.SetStateAction<Knowledge[]>>;
// }) {
//   // 我懂了，我需要使用一个state来保存文件的list
//   // 每当有文件上传完毕之后，我们就更新这个state
//   // 然后就会重新渲染组件
//   // 这是对的

//   const onDrop = React.useCallback(
//     (acceptedFiles) => {
//       acceptedFiles.forEach((file) => {
//         const formData = new FormData();
//         formData.append("file", file);

//         fetch("http://localhost:8000/api/knowledge/upload-file", {
//           method: "POST",
//           body: formData,
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             console.log(data);
//             setKnowledges((prev) => [
//               ...prev,
//               new Knowledge({ filename: file.name, id: data }),
//             ]);
//           })
//           .catch((error) => console.error(error));
//       });
//     },
//     [setKnowledges]
//   );

//   const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
//     onDrop,
//   });
//   const files = knowledges.map((knowledge) => (
//     <li key={knowledge.id}>{knowledge.filename}</li>
//   ));

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 2,
//         border: "1px dashed #ccc",
//       }}
//     >
//       <section className="container">
//         <div {...getRootProps({ className: "dropzone" })}>
//           <input {...getInputProps()} />
//           <p>Drag 'n' drop some files here, or click to select files</p>
//         </div>
//         <aside>
//           <h4>Files</h4>
//           <ul>{files}</ul>
//         </aside>
//       </section>
//     </Box>
//   );
// }

// function CreateBotForm({ knowledges }: { knowledges: Knowledge[] }) {
//   const { handleSubmit, control } = useForm<CreateBotFormData>();

//   const onSubmit = (data: CreateBotFormData) => {
//     console.log(data);
//     createBot(data, knowledges);
//   };

//   return (
//     <Box
//       component={"form"}
//       onSubmit={handleSubmit(onSubmit)}
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 2,
//       }}
//     >
//       <Controller
//         name="name"
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <TextField label="Name" variant="outlined" {...field} />
//         )}
//       ></Controller>

//       <Controller
//         name="description"
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <TextField label="Description" variant="outlined" {...field} />
//         )}
//       ></Controller>

//       {/* <Controller
//         name="knowledges"
//         control={control}
//         defaultValue={[]}
//         render={({ field }) => (
//           <TextField label="Knowledges" variant="outlined" {...field} />
//         )}
//       ></Controller> */}

//       <Button variant="contained" type="submit">
//         Create
//       </Button>
//     </Box>
//   );
// }

export default function Page() {
  // const [knowledges, setKnowledges] = React.useState<Knowledge[]>([]);

  // <CreateBotForm knowledges={knowledges} />
  // <Basic knowledges={knowledges} setKnowledges={setKnowledges} />
  return <CreateAgentForm />;
}
