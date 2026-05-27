import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Loader,
  Stack,
  TextField,
  Typography,
} from "@cgi-learning-hub/ui";
import { OptionListItemType, VisuallyHidden } from "@edifice.io/react";
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { COMMON } from "~/core/constants";
import {
  BoxComponentType,
  BreakpointVariant,
  ComponentVariant,
  TypographyFontStyle,
  TypographyVariant,
} from "~/core/themeProps";

import { useSearch } from "./hooks/useSearch";
import useShare from "./hooks/useShare";
import { useShareBookmark } from "./hooks/useShareBookmark";
import { t } from "~/i18n";
import {
  actionColumnStyle,
  avatarColumnStyle,
  avatarStyle,
  defaultAvatarStyle,
  nameColumnStyle,
  rightsColumnStyle,
} from "./style";
import { flexStartBoxStyle } from "~/styles/boxStyles";
import { IShareResourceModalProps, SelectOptionProps } from "./type";
import { ShareLine } from "./ShareLine";
import { ShareNewBookmark } from "./ShareNewBookmark";
import { ShareRight } from "@edifice.io/client";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

export const ShareResourceModal = ({
  appCode,
  isOpen,
  shareOptions,
  onCancel,
  onSuccess,
}: IShareResourceModalProps) => {
  const { resourceId, resourceCreatorId, resourceRights } = shareOptions;
  const [isLoading, setIsLoading] = useState(true);
  const [resetKey, setResetKey] = useState<number>(0);
  const TEXT_PRIMARY_COLOR = "text.primary";

  const {
    state: { isSharing, shareRights, shareRightActions },
    dispatch: shareDispatch,
    myAvatar,
    currentIsAuthor,
    handleShare,
    toggleRight,
    handleDeleteRow,
    hasUserInterracted,
    setHasUserInterracted,
  } = useShare({
    appCode,
    resourceId,
    resourceCreatorId,
    resourceRights,
    setIsLoading,
    onSuccess,
  });

  const {
    state: { searchResults },
    showSearchLoading,
    showSearchAdmlHint,
    getSearchMinLength,
    handleSearchInputChange,
    handleSearchResultsChange,
  } = useSearch({
    appCode,
    resourceId,
    resourceCreatorId,
    shareRights,
    shareDispatch,
  });

  const {
    refBookmark,
    showBookmark,
    handleBookmarkChange,
    toggleBookmark,
    bookmark,
    handleOnSave,
  } = useShareBookmark({ shareRights, shareDispatch, setHasUserInterracted });

  const { t: tEdifice } = useTranslation(COMMON);

  const handleSearchChange = useCallback(
    (event: SyntheticEvent, value: string) => {
      if (value.length >= getSearchMinLength()) {
        handleSearchInputChange(event as ChangeEvent<HTMLInputElement>);
      }
    },
    [handleSearchInputChange, getSearchMinLength],
  );

  const handleSelectOption = useCallback(
    (option: OptionListItemType | null, reason: string) => {
      if (reason != "selectOption" || !option) return;
      void handleSearchResultsChange([option.value]);
      setResetKey((prev) => prev + 1);
      setHasUserInterracted((prev) => prev || true);
    },
    [handleSearchResultsChange, setHasUserInterracted],
  );

  const displaySearchOption = (
    props: SelectOptionProps,
    option: OptionListItemType,
  ) => {
    const { key, ...optionProps } = props;
    return (
      <Box key={key} component="li" {...optionProps}>
        <Button
          startIcon={option.icon}
          variant="text"
          color="inherit"
          sx={{ "&:hover": { backgroundColor: "transparent" } }}
        >
          {option.label}
        </Button>
      </Box>
    );
  };

  const getNoOptionsText = (): string => {
    return t(
      showSearchAdmlHint()
        ? "appointments.share.modal.search.minChars"
        : "appointments.share.modal.search.noResult",
    );
  };

  return createPortal(
    <Dialog
      open={isOpen}
      onClose={onCancel}
      maxWidth={BreakpointVariant.MD}
      fullWidth
    >
      <DialogTitle
        color={TEXT_PRIMARY_COLOR}
        variant={TypographyVariant.H2}
        fontWeight={TypographyFontStyle.BOLD}
      >
        {t("appointments.share.modal.title")}
      </DialogTitle>
      <DialogContent>
        <Stack gap={4}>
          {/* Search user */}
          <Stack gap={2}>
            <Box sx={flexStartBoxStyle}>
              <Typography
                color={TEXT_PRIMARY_COLOR}
                variant={TypographyVariant.H3}
              >
                {t("appointments.share.modal.search.title")}
              </Typography>
            </Box>
            <Autocomplete
              key={resetKey}
              autoComplete
              autoHighlight
              clearOnBlur
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t("appointments.share.modal.search.placeholder")}
                />
              )}
              onInputChange={(event, value) => handleSearchChange(event, value)}
              onChange={(_, value, reason) => handleSelectOption(value, reason)}
              noOptionsText={getNoOptionsText()}
              options={searchResults}
              renderOption={(props, option) =>
                displaySearchOption(props, option)
              }
              loading={showSearchLoading()}
            />
          </Stack>
          {/* Sharing grid */}
          <Stack gap={2}>
            <Typography
              color={TEXT_PRIMARY_COLOR}
              variant={TypographyVariant.H3}
            >
              {tEdifice("explorer.modal.share.usersWithAccess")}
            </Typography>
            <Box className="table-responsive">
              {isLoading ? (
                <Loader />
              ) : (
                <Box
                  component={BoxComponentType.TABLE}
                  className="table border align-middle mb-0"
                >
                  {/* HEAD */}
                  <Box component={BoxComponentType.THEAD}>
                    <Box
                      component={BoxComponentType.TR}
                      sx={{ backgroundColor: "primary.main" }}
                    >
                      <Box
                        component={BoxComponentType.TH}
                        sx={avatarColumnStyle}
                      >
                        <VisuallyHidden>
                          {tEdifice("explorer.modal.share.avatar.shared.alt")}
                        </VisuallyHidden>
                      </Box>
                      <Box component={BoxComponentType.TH} sx={nameColumnStyle}>
                        <VisuallyHidden>
                          {tEdifice("explorer.modal.share.search.placeholder")}
                        </VisuallyHidden>
                      </Box>
                      {shareRightActions
                        .filter(
                          (shareRightAction) => shareRightAction.id === "read",
                        )
                        .map((shareRightAction) => (
                          <Box
                            component={BoxComponentType.TH}
                            key={shareRightAction.displayName}
                            sx={rightsColumnStyle}
                          >
                            {t(
                              `appointments.share.rights.${shareRightAction.displayName}`,
                            )}
                          </Box>
                        ))}
                      <Box
                        component={BoxComponentType.TH}
                        sx={actionColumnStyle}
                      >
                        <VisuallyHidden>{tEdifice("close")}</VisuallyHidden>
                      </Box>
                    </Box>
                  </Box>
                  {/* BODY */}
                  <Box component={BoxComponentType.TBODY}>
                    {/* Current user */}
                    <Box component={BoxComponentType.TR}>
                      <Box
                        component={BoxComponentType.TD}
                        sx={avatarColumnStyle}
                      >
                        <Avatar src={myAvatar} sx={avatarStyle}>
                          <PersonRoundedIcon sx={defaultAvatarStyle} />
                        </Avatar>
                      </Box>
                      <Box component={BoxComponentType.TD} sx={nameColumnStyle}>
                        {tEdifice("share.me")}
                      </Box>
                      <Box
                        component={BoxComponentType.TD}
                        key={"read"}
                        sx={rightsColumnStyle}
                      >
                        <Checkbox
                          color="secondary"
                          checked={currentIsAuthor()}
                          disabled
                        />
                      </Box>
                      <Box
                        component={BoxComponentType.TD}
                        sx={actionColumnStyle}
                      ></Box>
                    </Box>
                    {/* Other users */}
                    {shareRights.rights.map((shareRight: ShareRight) => (
                      <ShareLine
                        key={shareRight.id}
                        showBookmark={showBookmark}
                        shareRightActions={shareRightActions}
                        shareRight={shareRight}
                        onDeleteRow={handleDeleteRow}
                        toggleRight={toggleRight}
                        toggleBookmark={toggleBookmark}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Stack>
          {/* Bookmarks */}
          <Stack gap={2}>
            <Typography
              color={TEXT_PRIMARY_COLOR}
              variant={TypographyVariant.H3}
            >
              {t("appointments.share.modal.bookmark.title")}
            </Typography>
            <ShareNewBookmark
              refBookmark={refBookmark}
              bookmark={bookmark}
              onBookmarkChange={handleBookmarkChange}
              onSave={handleOnSave}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant={ComponentVariant.OUTLINED} onClick={onCancel}>
          {tEdifice("explorer.cancel")}
        </Button>
        <Button
          variant={ComponentVariant.CONTAINED}
          onClick={() => void handleShare()}
          disabled={isSharing || !hasUserInterracted}
        >
          {tEdifice("share")}
        </Button>
      </DialogActions>
    </Dialog>,
    document.getElementById("portal") as HTMLElement,
  );
};
