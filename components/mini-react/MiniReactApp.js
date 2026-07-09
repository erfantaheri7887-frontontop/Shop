import { useMemo, useState } from "react";
import useLocalStorageState from "./useLocalStorageState";

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function Pill({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 12,
        background: "#f2f2f2",
        color: "#333",
      }}
    >
      {children}
    </span>
  );
}

export default function MiniReactApp() {
  const [items, setItems] = useLocalStorageState("mini-react.todos", []);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | done

  const stats = useMemo(() => {
    const total = items.length;
    const done = items.filter((t) => t.done).length;
    return { total, done, active: total - done };
  }, [items]);

  const visibleItems = useMemo(() => {
    if (filter === "active") return items.filter((t) => !t.done);
    if (filter === "done") return items.filter((t) => t.done);
    return items;
  }, [items, filter]);

  function addItem(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setItems((prev) => [{ id: uid(), title: value, done: false }, ...prev]);
    setText("");
  }

  function toggle(id) {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  function clearDone() {
    setItems((prev) => prev.filter((t) => !t.done));
  }

  return (
    <section
      style={{
        marginTop: 16,
        border: "1px solid #e6e6e6",
        borderRadius: 12,
        padding: 16,
        background: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <Pill>total: {stats.total}</Pill>
        <Pill>active: {stats.active}</Pill>
        <Pill>done: {stats.done}</Pill>
      </div>

      <form onSubmit={addItem} style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="یه کار جدید بنویس…"
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #111",
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          اضافه
        </button>
      </form>

      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        {[
          { id: "all", label: "همه" },
          { id: "active", label: "انجام‌نشده" },
          { id: "done", label: "انجام‌شده" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            type="button"
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: filter === f.id ? "#f7f7f7" : "white",
              cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <button
          onClick={clearDone}
          type="button"
          disabled={stats.done === 0}
          style={{
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "white",
            cursor: stats.done === 0 ? "not-allowed" : "pointer",
            opacity: stats.done === 0 ? 0.5 : 1,
          }}
        >
          پاک‌کردن انجام‌شده‌ها
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0" }}>
        {visibleItems.length === 0 ? (
          <li style={{ padding: 12, color: "#666" }}>چیزی برای نمایش نیست.</li>
        ) : (
          visibleItems.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 8px",
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              <span style={{ flex: 1, textDecoration: t.done ? "line-through" : "none" }}>
                {t.title}
              </span>
              <button
                type="button"
                onClick={() => remove(t.id)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                حذف
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

