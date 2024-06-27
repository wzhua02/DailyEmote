//each diary entry
/*
  1. id
  2. title
  3. isHappy
  4. date
    4.1 Year
    4.2 Month
    4.3 Day
  5. textEntry
*/
export type entryData = {
  id: string;
  title: string;
  isHappy: boolean;
  year: number;
  month: number;
  day: number;
  textEntry: string;
};

//Props for CalendarComponent
export type CalendarComponentProps = {
  selectedDate: string,
  setSelectedDate: (date: string) => void,
  openModal: () => void,
};

//Props for modalList, modalContent
export type modalContentProps = {
  selectedDate: string,
  closeModal: () => void,
}

//Props for modalListEntry
export type EntryProps = {
  item: entryData,
  closeModal: () => void,
  reload: () => void,
}

//Props for HeaderComponent
export type HeaderProps = {
  goBack: () => void;
}

//Props for HeaderComponent for ViewEntry
export type ViewHeaderProps = {
  goBack: () => void;
  goEdit: () => void;
}

//Props for titleInput, textEntryInput
export type textInputProps = {
  text: string,
  setText: (text: string) => void,
}

//Props for AddEntryButton
export type AddEntryButtonProps = {
  title: string;
  dateString: string;
  textEntry: string;
  resetAll: () => void;
}

//Props for AddEntryButton
export type EditEntryButtonProps = {
  id: string;
  title: string;
  dateString: string;
  textEntry: string;
  resetAll: () => void;
}

//Props for AddEntryComponents
export type AddEntryProps = {
  dateString: string,
  setDateString: React.Dispatch<React.SetStateAction<string>>,
  title: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  textEntry: string,
  setTextEntry: React.Dispatch<React.SetStateAction<string>>,
}