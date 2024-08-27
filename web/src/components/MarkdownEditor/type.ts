export type MD_HEADER_BUTTON_TYPE = 'bold' | 'italic' | 'title' | 'stripper_line' | 'unordered_list' | 'ordered_list' | 'upcoming' | 'reference'
  | 'code_block' | 'image' | 'video' | 'table' | 'href';

export interface IMDHeaderButton {
  title: string;
  svg: string;
  default: string;
  select?: {
    start: number,
    end: number
  }
  type: MD_HEADER_BUTTON_TYPE;
}

export interface IMDGrammarList {
  title: string;
  content: string;
  copy: string;
}

export interface IMDGrammar {
  title: string;
  list: IMDGrammarList[]
}
