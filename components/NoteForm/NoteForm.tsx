"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDraftNote } from "@/lib/store/noteStore";
import { ChangeEvent } from "react";
import { createNote } from "@/lib/api//clientApi";

type CreateNote = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setDraft, clearDraft, draft } = useDraftNote();
  const mutation = useMutation({
    mutationFn: (newTask: CreateNote) => createNote(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("You have successfully created a new note!");
      clearDraft();
      router.push("/notes/filter/All");
      //для того щоб нотатки обновились
    },
    onError: () => {
      toast.error("Something went wrong...try again.");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData) as unknown as CreateNote;
    if (data) {
      mutation.mutate({
        title: data.title,
        content: data.content,
        tag: data.tag,
      });
    }
  };

  const handleCancel = () => {
    router.push("/notes/filter/All");
  };

  const createDraft = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setDraft({
      ...draft,
      [name]: value,
    });
  };

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          value={draft?.title ?? ""}
          id="title"
          type="text"
          name="title"
          className={css.input}
          onChange={createDraft}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          value={draft?.content ?? ""}
          onChange={createDraft}
          id="content"
          name="content"
          className={css.textarea}
          rows={8}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          value={draft?.tag ?? ""}
          id="tag"
          name="tag"
          className={css.select}
          onChange={createDraft}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
