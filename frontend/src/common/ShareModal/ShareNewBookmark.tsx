import { Button, FormControl, Stack, TextField } from "@cgi-learning-hub/ui";
import { Ref } from "react";
import { t } from "~/i18n";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { BookmarkProps } from "./type";

export const ShareNewBookmark = ({
  bookmark,
  refBookmark,
  onBookmarkChange,
  onSave,
}: {
  bookmark: BookmarkProps;
  refBookmark: Ref<HTMLInputElement>;
  onBookmarkChange: () => void;
  onSave: () => void;
}) => {
  return (
    <FormControl id="bookmarkName">
      <Stack direction="row" gap={2} flexWrap={"wrap"}>
        <TextField
          key={bookmark.id}
          inputRef={refBookmark}
          variant={"standard"}
          placeholder={t("appointments.share.modal.bookmark.placeholder")}
          onChange={onBookmarkChange}
          sx={{ minWidth: "50%", flex: 1, width: "auto" }}
        />
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          disabled={bookmark.name.length === 0}
          startIcon={<SaveRoundedIcon />}
          onClick={onSave}
          sx={{ textWrap: "nowrap", minHeight: "3rem", fontSize: "1.3rem" }}
        >
          {t("appointments.share.modal.bookmark.button")}
        </Button>
      </Stack>
    </FormControl>
  );
};
