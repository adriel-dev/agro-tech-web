export interface ConfirmationDialogData {
    text: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}