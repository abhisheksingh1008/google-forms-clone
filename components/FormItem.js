import { Box } from "@mui/material";
import Link from "next/link";
import ShareIcon from "@mui/icons-material/Share";
import toast from "react-hot-toast";

const FormItem = ({ id, formTitle, formDescription }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        width: "8.6rem",
        height: "8.5rem",
        overflow: "hidden",
      }}
    >
      <Link href={`/forms/${id}`}>
        <img
          src={
            "https://ssl.gstatic.com/docs/templates/thumbnails/1xQF3s6EP0d58H-XJ7R440OpREKo4KqEapa0mkw43RPE_400_1.png"
          }
          alt="form picture"
          style={{ width: "100%", height: "78%", objectFit: "cover" }}
        />
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0.25rem",
          // flexWrap: "wrap",
          bgcolor: "#e2dfdf",
        }}
      >
        <Link href={`/forms/${id}`}>
          <Box>{formTitle.substring(0, 9)}...</Box>
        </Link>
        <span
          onClick={async (e) => {
            await navigator.clipboard
              .writeText(`${window.location.origin}/submit/${id}`)
              .then(() => toast.success("Link copied to clipboard."));
          }}
          style={{ cursor: "pointer" }}
        >
          <ShareIcon />
        </span>
      </Box>
    </Box>
  );
};

export default FormItem;
