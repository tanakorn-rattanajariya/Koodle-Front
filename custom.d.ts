declare global {
  interface Number {
    format(n: number, x: number): string;
  }
}
declare global {
  interface Array {
    first: () => any | null;
    last: () => any | null;
    groupBy: (key: any) => any | null;
    toSet: () => Set<T>;
    insert: (index: number, item: T) => void;
    remove: (index: number, number?: number) => void;
    toDict: (key?: string) => {};
    unique: () => Array<T>;
    replaceWith: (data: Record<string, any>, id?: any) => {};
    insertOrUpdate: (data: any) => Array<T>;
  }
}

declare global {
  interface Set<T> {
    toArray: () => Array<T>;
  }
}

declare global {
  interface String {
    shorten: (l: number) => String;
  }
}

export {};
