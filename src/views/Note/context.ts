import { inject, InjectionKey, provide, reactive, ref } from "vue";

interface Blog {
  content: string;
  id: string;
  name: string;
}

interface BlogTree {
  blogId: Blog;
  children?: BlogTree[];
}
export interface NoteContext {
  // 请求相关
  saveBlog: (blogId: string) => void;
  listBlog: () => void;
  getBlogContent: (blogId: string) => void;
  // 关于文件切换与多选
  currentBlog: Blog[];
  addCurrentBlog: (blogId: string) => void;
  removeCurrentBlog: (blogId: string) => void;
  switchCurrentBlog: (blogId: string) => void;
  clearCurrentBlog: () => void;
  // 文件操作
  blogList: Blog[];
  createBlog: (blogName: string) => void;
  deleteBlog: (blogId: string) => void;
  // 文件结构
  blogTree: BlogTree[];
  updateBlogTree: (newBlogTree: BlogTree[]) => void;
}

export const NoteInjectionKey: InjectionKey<NoteContext> = Symbol("UI");
export const createNoteContext = () => {
  // 工具方法
  const getBlogById = (id: string, blogs: Blog[]) =>
    blogs.find((b) => id === b.id);
  const getBlogIndexById = (id: string, blogs: Blog[]) =>
    blogs.findIndex((b) => id === b.id);
  const genBlogId = () => "";
  // 实现每一个方法
  let currentBlog: Blog[] = [];
  let blogTree: BlogTree[] = [];
  let blogList: Blog[] = [];
  const saveBlog = async () => null;
  const listBlog = async () => null;
  const getBlogContent = async () => null;
  provide(
    NoteInjectionKey,
    reactive({
      currentBlog,
      blogTree,
      blogList,
      saveBlog,
      listBlog,
      getBlogContent,
      addCurrentBlog: (blogId) => {
        const targetBlog = getBlogById(blogId, blogList);
        if (!targetBlog) return;
        if (currentBlog.includes(targetBlog)) return;
        currentBlog.push(targetBlog);
      },
      removeCurrentBlog: (blogId) => {
        const targetBlog = getBlogById(blogId, blogList);
        if (!targetBlog) return;
        const targetIndex = getBlogIndexById(targetBlog.id, currentBlog);
        if (targetIndex === -1) return;
        currentBlog.slice(targetIndex, 1);
      },
      switchCurrentBlog: (blogId) => {
        const targetBlog = getBlogById(blogId, blogList);
        if (!targetBlog) return;
        blogList = [targetBlog];
      },
      clearCurrentBlog: () => {
        if (currentBlog.length === 0) return;
        currentBlog.slice(1);
      },
      createBlog: (blogName) => {
        const newBlog = {
          id: genBlogId(),
          content: `# ${blogName}`,
          name: blogName,
        };
        blogList.push(newBlog);
        // 找位置，在 blogTree 上
      },
      deleteBlog: (blogId) => {
        const targetBlogIndex = getBlogIndexById(blogId, blogList);
        if (targetBlogIndex === -1) return;
        const target = blogList[targetBlogIndex];
        // 发个请求，再本地去掉这个 Blog
        blogList.slice(targetBlogIndex, 1);
        // blogTree 也要变化
      },
      updateBlogTree: (newBlogTree) => {
        blogTree = newBlogTree;
      },
    })
  );
};
export const useNoteContext = (): NoteContext | undefined =>
  inject(NoteInjectionKey);
