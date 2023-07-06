declare interface StorageSchema {}

declare namespace chrome {
  export namespace storage {
    export interface C_StorageChange<T extends keyof StorageSchema = keyof StorageSchema> {
      /**
       * The old value of the item, if there was an old value.
       */
      oldValue?: StorageSchema[T];

      /**
       * The new value of the item, if there is a new value.
       */
      newValue?: StorageSchema[T];
    }
    export interface C_StorageArea {
      /**
       * Fired when one or more items change.
       *
       * @since Chrome 73
       */
      onChanged: events.Event<
        (changes: { [T in keyof StorageSchema]?: C_StorageChange<T> }) => void
      >;

      /**
       * Gets one or more items from storage.
       *
       * @chrome-returns-extra since Chrome 88
       * @param keys A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in `null` to get the entire contents of storage.
       */
      get<T extends keyof StorageSchema = keyof StorageSchema>(): Promise<Partial<StorageSchema>>;
      get<T extends keyof StorageSchema = keyof StorageSchema>(
        keys: T,
      ): Promise<{ [K in T]?: StorageSchema[K] }>;
      get<T extends keyof StorageSchema = keyof StorageSchema>(
        keys: T[],
      ): Promise<{ [K in T]?: StorageSchema[K] }>;
      get<T extends keyof StorageSchema = keyof StorageSchema>(keys: {
        [K in T]?: StorageSchema[K];
      }): Promise<{ [K in T]?: StorageSchema[K] }>;

      /**
       * Gets one or more items from storage.
       *
       * @param keys A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in `null` to get the entire contents of storage.
       * @param callback Callback with storage items, or on failure (in which case {@link runtime.lastError} will be set).
       */
      get<T extends keyof StorageSchema = keyof StorageSchema>(
        keys?: null,
        /**
         * @param items Object with items in their key-value mappings.
         */
        callback?: (items: Partial<StorageSchema>) => void,
      ): void;
      get<T extends keyof StorageSchema = keyof StorageSchema>(
        keys: T,
        /**
         * @param items Object with items in their key-value mappings.
         */
        callback?: (items: { [K in T]?: StorageSchema[K] }) => void,
      ): void;
      get<T extends keyof StorageSchema = keyof StorageSchema>(
        keys: T[],
        /**
         * @param items Object with items in their key-value mappings.
         */
        callback?: (items: { [K in T]?: StorageSchema[K] }) => void,
      ): void;
      get<T extends keyof StorageSchema = keyof StorageSchema>(
        keys: { [K in T]?: StorageSchema[K] },
        /**
         * @param items Object with items in their key-value mappings.
         */
        callback?: (items: { [K in T]?: StorageSchema[K] }) => void,
      ): void;

      /**
       * Gets the amount of space (in bytes) being used by one or more items.
       *
       * @chrome-returns-extra since Chrome 88
       * @param keys A single key or list of keys to get the total usage for. An empty list will return 0. Pass in `null` to get the total usage of all of storage.
       */
      getBytesInUse(keys?: keyof StorageSchema | keyof StorageSchema[]): Promise<number>;

      /**
       * Gets the amount of space (in bytes) being used by one or more items.
       *
       * @param keys A single key or list of keys to get the total usage for. An empty list will return 0. Pass in `null` to get the total usage of all of storage.
       * @param callback Callback with the amount of space being used by storage, or on failure (in which case {@link runtime.lastError} will be set).
       */
      getBytesInUse(
        keys?: keyof StorageSchema | keyof StorageSchema[],
        /**
         * @param bytesInUse Amount of space being used in storage, in bytes.
         */
        callback?: (bytesInUse: number) => void,
      ): void;

      /**
       * Sets multiple items.
       *
       * @chrome-returns-extra since Chrome 88
       * @param items

      An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.

      Primitive values such as numbers will serialize as expected. Values with a `typeof` `"object"` and `"function"` will typically serialize to `{}`, with the exception of `Array` (serializes as expected), `Date`, and `Regex` (serialize using their `String` representation).
       */
      set(items: Partial<StorageSchema>): Promise<void>;

      /**
       * Sets multiple items.
       *
       * @param items

      An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.

      Primitive values such as numbers will serialize as expected. Values with a `typeof` `"object"` and `"function"` will typically serialize to `{}`, with the exception of `Array` (serializes as expected), `Date`, and `Regex` (serialize using their `String` representation).
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       */
      set(items: Partial<StorageSchema>, callback?: () => void): void;

      /**
       * Removes one or more items from storage.
       *
       * @chrome-returns-extra since Chrome 88
       * @param keys A single key or a list of keys for items to remove.
       */
      remove(keys: keyof StorageSchema | keyof StorageSchema[]): Promise<void>;

      /**
       * Removes one or more items from storage.
       *
       * @param keys A single key or a list of keys for items to remove.
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       */
      remove(keys: keyof StorageSchema | keyof StorageSchema[], callback?: () => void): void;

      /**
       * Removes all items from storage.
       *
       * @chrome-returns-extra since Chrome 88
       */
      clear(): Promise<void>;

      /**
       * Removes all items from storage.
       *
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       */
      clear(callback?: () => void): void;

      /**
       * Sets the desired access level for the storage area. The default will be only trusted contexts.
       *
       * @since Chrome 102
       */
      setAccessLevel(accessOptions: {
        /**
         * The access level of the storage area.
         */
        accessLevel: AccessLevel;
      }): Promise<void>;

      /**
       * Sets the desired access level for the storage area. The default will be only trusted contexts.
       *
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       * @since Chrome 102
       */
      setAccessLevel(
        accessOptions: {
          /**
           * The access level of the storage area.
           */
          accessLevel: AccessLevel;
        },
        callback?: () => void,
      ): void;
    }

    /**
     * Items in the `sync` storage area are synced using Chrome Sync.
     */
    export const sync: C_StorageArea & {
      /**
       * The maximum total amount (in bytes) of data that can be stored in sync storage, as measured by the JSON stringification of every value plus every key's length. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError}.
       */
      QUOTA_BYTES: 102400;

      /**
       * The maximum size (in bytes) of each individual item in sync storage, as measured by the JSON stringification of its value plus its key length. Updates containing items larger than this limit will fail immediately and set {@link runtime.lastError}.
       */
      QUOTA_BYTES_PER_ITEM: 8192;

      /**
       * The maximum number of items that can be stored in sync storage. Updates that would cause this limit to be exceeded will fail immediately and set {@link runtime.lastError}.
       */
      MAX_ITEMS: 512;

      /**
       * The maximum number of `set`, `remove`, or `clear` operations that can be performed each hour. This is 1 every 2 seconds, a lower ceiling than the short term higher writes-per-minute limit.
       *
       * Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError}.
       */
      MAX_WRITE_OPERATIONS_PER_HOUR: 1800;

      /**
       * The maximum number of `set`, `remove`, or `clear` operations that can be performed each minute. This is 2 per second, providing higher throughput than writes-per-hour over a shorter period of time.
       *
       * Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError}.
       */
      MAX_WRITE_OPERATIONS_PER_MINUTE: 120;

      /**
       * @deprecated The storage.sync API no longer has a sustained write operation quota.
       */
      MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: 1000000;
    };

    /**
     * Items in the `local` storage area are local to each machine.
     */
    export const local: C_StorageArea & {
      /**
       * The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the `unlimitedStorage` permission. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError}.
       */
      QUOTA_BYTES: 5242880;
    };

    /**
     * Items in the `managed` storage area are set by the domain administrator, and are read-only for the extension; trying to modify this namespace results in an error.
     */
    export const managed: C_StorageArea;

    /**
     * Items in the `session` storage area are stored in-memory and will not be persisted to disk.
     *
     * @since Chrome 102
     * @chrome-min-manifest MV3
     */
    export const session: C_StorageArea & {
      /**
       * The maximum amount (in bytes) of data that can be stored in memory, as measured by estimating the dynamically allocated memory usage of every value and key. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError}.
       */
      QUOTA_BYTES: 10485760;
    };
  }
}

import browser = chrome;

declare var browser: typeof chrome;
