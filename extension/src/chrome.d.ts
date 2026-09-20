declare namespace chrome {
  namespace storage {
    namespace local {
      function get(keys?: string | string[] | Record<string, unknown> | null): Promise<Record<string, unknown>>;
      function set(items: Record<string, unknown>): Promise<void>;
      function remove(keys: string | string[]): Promise<void>;
    }
  }
  namespace tabs {
    interface Tab { id?: number; url?: string; title?: string; }
    function create(createProperties: { url: string }): Promise<Tab>;
    function query(queryInfo: { active?: boolean; currentWindow?: boolean }): Promise<Tab[]>;
  }
  namespace runtime {
    const lastError: { message?: string } | undefined;
    function getURL(path: string): string;
    function openOptionsPage(): Promise<void>;
    const onInstalled: { addListener(callback: () => void): void };
  }
  namespace action {
    function openPopup(): Promise<void>;
  }
  namespace contextMenus {
    interface OnClickData { menuItemId: string; linkUrl?: string; pageUrl?: string; selectionText?: string; }
    function create(properties: Record<string, unknown>): void;
    function removeAll(): Promise<void>;
    const onClicked: { addListener(callback: (info: OnClickData, tab?: tabs.Tab) => void): void };
  }
  namespace commands {
    const onCommand: { addListener(callback: (command: string) => void): void };
  }
}
