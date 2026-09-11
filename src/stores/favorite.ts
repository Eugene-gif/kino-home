import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/api/supabase';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import type { FavoriteItem, ContentFavoriteItem } from './typesForStores';

export const useFavoriteStore = defineStore('favorite', () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  const toast = useToast();

  const userId = computed(() => user.value?.id ?? '');
  const isLoading = ref<boolean>(false);
  const isLoadingFavoriteById = ref<boolean>(false);
  const isLoadingUpdateItem = ref<boolean>(false);
  const isLoadingDeleteItem = ref<boolean>(false);
  const favoriteList = ref<FavoriteItem[]>([]);
  const currentFavoriteItem = ref<ContentFavoriteItem | null>(null);
  const currentItemId = ref<string | number | null>(null);
  const addedFavorite = computed(() => currentFavoriteItem.value ? true : false);

  const addFavoriteItem = async (content: ContentFavoriteItem, type: 'movie' | 'tv') => {
    isLoadingFavoriteById.value = true;
    try {
      const payload = {
        user_id: userId.value,
        content_id: content?.id,
        content: {
          id: content?.id,
          title: content?.title,
          tagline: content?.tagline,
          overview: content?.overview,
          backdropPath: content?.backdropPath,
          actors: content?.actors,
          genres: content?.genres,
          rating: content?.rating,
          time: content?.time,
          year: content?.year,
          releaseDate: content?.releaseDate,
          cash: content?.cash,
          budget: content?.budget,
          director: content?.director,
          countries: content?.countries,
          mediaType: type
        },
        has_watched: false,
      };

      const { data, error } = await supabase
        .from('collections')
        .insert(payload).select();

      if (error) throw error;

      const newItem = data?.[0];
      currentFavoriteItem.value = newItem;

      if (newItem) {
        favoriteList.value.unshift(newItem);
      }

      toast.success('Добавлено в избранное', { timeout: 1000 });
    } catch {
      toast.error('Ошибка добавления, попробуйте позже');
    } finally {
      isLoadingFavoriteById.value = false;
    }
  }

  const updateFavoriteItem = async (contentId: number, hasWatched?: boolean) => {
    isLoadingUpdateItem.value = true;
    currentItemId.value = contentId;
    try {
      const { error } = await supabase
        .from('collections')
        .update({ has_watched: !hasWatched })
        .eq('user_id', userId.value)
        .eq('content_id', contentId)
        .select();

      if (error) throw error;

      const item = favoriteList.value.find(el => el.content_id === contentId);
      if (item) item.has_watched = !item.has_watched;

      toast.success(hasWatched ? 'Удалён из просмотренных' : 'Добавлен в просмотренные', { timeout: 1500 });
    } catch {
      toast.error('Ошибка, попробуйте позже');
    } finally {
      isLoadingUpdateItem.value = false;
      currentItemId.value = null;
    }
  }

  const deleteFavoriteItem = async (id: number) => {
    if (!id) return;
    isLoadingDeleteItem.value = true;
    isLoadingFavoriteById.value = true;
    try {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('user_id', userId.value)
        .eq('content_id', id);

      if (error) throw error;

      toast.info('Удалено из избранного', { timeout: 1000 });
      favoriteList.value = favoriteList.value.filter(item => item.content_id !== id);
    } catch {
      toast.error('Ошибка удаления');
    } finally {
      isLoadingDeleteItem.value = false;
      isLoadingFavoriteById.value = false;
      currentFavoriteItem.value = null;
    }
  }

  const getFavoriteItem = async (id: number) => {
    if (!id) return;
    isLoadingFavoriteById.value = true;
    currentFavoriteItem.value = null;

    try {
      const { data: content, error } = await supabase
        .from('collections')
        .select('*')
        .eq('content_id', id)
        .eq('user_id', userId.value)
        .maybeSingle();

      if (error) throw error;

      currentFavoriteItem.value = content;
    } catch {
      toast.error('Ошибка получения медиа', { timeout: 1000 });
    } finally {
      isLoadingFavoriteById.value = false;
    }
  }

  const getFavoriteList = async () => {
    isLoading.value = true;
    try {
      const { data: collections, error } = await supabase
        .from('collections')
        .select('*');

      if (error) {
        throw error;
      }

      favoriteList.value = collections.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
    } catch {
      toast.error('Ошибка получения коллекции');
    } finally {
      isLoading.value = false;
    }
  }

  return { userId, favoriteList, addedFavorite, currentFavoriteItem, currentItemId, isLoading, isLoadingFavoriteById, isLoadingUpdateItem, isLoadingDeleteItem, addFavoriteItem, deleteFavoriteItem, updateFavoriteItem, getFavoriteItem, getFavoriteList };
})
