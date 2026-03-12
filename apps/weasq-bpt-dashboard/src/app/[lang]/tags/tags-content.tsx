'use client';

import { DictionaryContext, LocaleContext } from '@/app/providers';
import { Button, CustomInput, Modal } from '@weasq/weasq-ui';
import { clsx } from 'clsx';
import Link from 'next/link';
import { use, useCallback, useEffect, useState } from 'react';

type TagResource = {
  id: string;
  name: string;
};

const TagsContent = () => {
  const dictionary = use(DictionaryContext);
  const locale = use(LocaleContext);
  const [tags, setTags] = useState<TagResource[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editingTagName, setEditingTagName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingTagId, setDeletingTagId] = useState<string | null>(null);
  const [tagPendingDelete, setTagPendingDelete] = useState<TagResource | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const genericErrorMessage = dictionary?.tagsErrorGeneric ?? '';

  const fetchTags = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/bpt/tags', { method: 'GET' });

      if (!response.ok) {
        setErrorMessage(genericErrorMessage);
        return;
      }

      const nextTags = (await response.json()) as TagResource[];
      setTags(nextTags);
    } catch {
      setErrorMessage(genericErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [genericErrorMessage]);

  useEffect(() => {
    void fetchTags();
  }, [fetchTags]);

  const handleRefreshTags = async () => {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);

    try {
      await fetchTags();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleCreateTag = async () => {
    const trimmedName = newTagName.trim();

    if (!trimmedName || isCreating) {
      return;
    }

    setIsCreating(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/bpt/tags', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name: trimmedName }),
      });

      if (!response.ok) {
        setErrorMessage(genericErrorMessage);
        return;
      }

      const createdTag = (await response.json()) as TagResource;
      setTags((previousTags) => [createdTag, ...previousTags]);
      setNewTagName('');
    } catch {
      setErrorMessage(genericErrorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  const startEdit = (tag: TagResource) => {
    setEditingTagId(tag.id);
    setEditingTagName(tag.name);
  };

  const cancelEdit = () => {
    setEditingTagId(null);
    setEditingTagName('');
  };

  const handleUpdateTag = async () => {
    const trimmedName = editingTagName.trim();

    if (!editingTagId || !trimmedName || isUpdating) {
      return;
    }

    setIsUpdating(true);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/bpt/tags/${editingTagId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name: trimmedName }),
      });

      if (!response.ok) {
        setErrorMessage(genericErrorMessage);
        return;
      }

      const updatedTag = (await response.json()) as TagResource;
      setTags((previousTags) => previousTags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag)));
      cancelEdit();
    } catch {
      setErrorMessage(genericErrorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const openDeleteModal = (tag: TagResource) => {
    setTagPendingDelete(tag);
  };

  const closeDeleteModal = () => {
    if (deletingTagId) {
      return;
    }

    setTagPendingDelete(null);
  };

  const handleDeleteTag = async () => {
    const targetTagId = tagPendingDelete?.id;

    if (deletingTagId) {
      return;
    }

    if (!targetTagId) {
      return;
    }

    setDeletingTagId(targetTagId);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/bpt/tags/${targetTagId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setErrorMessage(genericErrorMessage);
        return;
      }

      setTags((previousTags) => previousTags.filter((tag) => tag.id !== targetTagId));
      if (editingTagId === targetTagId) {
        cancelEdit();
      }
      setTagPendingDelete(null);
    } catch {
      setErrorMessage(genericErrorMessage);
    } finally {
      setDeletingTagId(null);
    }
  };

  return (
    <main className={clsx('mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-16')}>
      <header className={clsx('space-y-3')}>
        <Link href={`/${locale}`} className={clsx('text-sm font-medium text-emerald-700 hover:text-emerald-800')}>
          {dictionary?.backToHome}
        </Link>
        <h1 className={clsx('text-3xl font-semibold tracking-tight text-slate-900')}>{dictionary?.tagsPageTitle}</h1>
        <p className={clsx('text-sm text-slate-600')}>{dictionary?.tagsPageDescription}</p>
      </header>

      <section className={clsx('space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5')}>
        <CustomInput
          value={newTagName}
          setValue={setNewTagName}
          label={dictionary?.tagsFieldLabel}
          placeholder={dictionary?.tagsFieldPlaceholder}
          isClearable
          disabled={isCreating}
          className={clsx('w-full')}
        />
        <div className={clsx('flex flex-wrap gap-2')}>
          <Button onClick={handleCreateTag} disabled={!newTagName.trim()} loading={isCreating}>
            {dictionary?.tagsCreateAction}
          </Button>
          <Button onClick={handleRefreshTags} disabled={isCreating || isRefreshing} loading={isRefreshing} invertTextOnHover={false}>
            {dictionary?.tagsRefreshAction}
          </Button>
        </div>
      </section>

      <section className={clsx('space-y-3 rounded-2xl border border-slate-200 bg-white p-5')}>
        <h2 className={clsx('text-lg font-semibold text-slate-900')}>{dictionary?.tagsListTitle}</h2>
        {errorMessage ? <p className={clsx('text-sm text-red-600')}>{errorMessage}</p> : null}
        {isLoading ? <p className={clsx('text-sm text-slate-600')}>{dictionary?.tagsLoading}</p> : null}
        {!isLoading && tags.length === 0 ? <p className={clsx('text-sm text-slate-600')}>{dictionary?.tagsEmptyState}</p> : null}

        {!isLoading && tags.length > 0 ? (
          <ul className={clsx('space-y-2')}>
            {tags.map((tag) => {
              const isEditing = editingTagId === tag.id;
              const isDeleting = deletingTagId === tag.id;

              return (
                <li key={tag.id} className={clsx('rounded-xl border border-slate-200 p-3')}>
                  <div className={clsx('flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between')}>
                    {isEditing ? (
                      <div className={clsx('w-full max-w-md')}>
                        <CustomInput
                          value={editingTagName}
                          setValue={setEditingTagName}
                          label={dictionary?.tagsFieldLabel}
                          isClearable
                          disabled={isUpdating}
                          className={clsx('w-full')}
                        />
                      </div>
                    ) : (
                      <p className={clsx('text-sm font-medium text-slate-900')}>{tag.name}</p>
                    )}

                    <div className={clsx('flex flex-wrap gap-2')}>
                      {isEditing ? (
                        <>
                          <Button onClick={handleUpdateTag} disabled={!editingTagName.trim()} loading={isUpdating}>
                            {dictionary?.tagsSaveAction}
                          </Button>
                          <Button onClick={cancelEdit} invertTextOnHover={false} disabled={isUpdating}>
                            {dictionary?.tagsCancelAction}
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => startEdit(tag)} invertTextOnHover={false} disabled={Boolean(deletingTagId)}>
                          {dictionary?.tagsEditAction}
                        </Button>
                      )}

                      <Button onClick={() => openDeleteModal(tag)} danger disabled={isDeleting || isUpdating || isCreating}>
                        {dictionary?.tagsDeleteAction}
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>

      <Modal
        isOpen={Boolean(tagPendingDelete)}
        closeModal={closeDeleteModal}
        closeLabel={dictionary?.tagsModalCloseLabel ?? ''}
        title={dictionary?.tagsDeleteModalTitle}
        description={dictionary?.tagsDeleteConfirm}
      >
        <div className={clsx('flex flex-wrap justify-end gap-2')}>
          <Button onClick={closeDeleteModal} invertTextOnHover={false} disabled={Boolean(deletingTagId)}>
            {dictionary?.tagsCancelAction}
          </Button>
          <Button onClick={handleDeleteTag} danger disabled={Boolean(deletingTagId)} loading={Boolean(deletingTagId)}>
            {dictionary?.tagsDeleteAction}
          </Button>
        </div>
      </Modal>
    </main>
  );
};

export { TagsContent };

