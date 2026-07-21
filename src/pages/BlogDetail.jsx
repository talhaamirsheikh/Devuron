import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Home, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import GlobalHero from "../utils/GlobalHero";
import { blogPosts } from "../constants/blog";

const BlogDetail = () => {
  const { slug } = useParams();
  
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [comments, setComments] = useState([]);

  const post = blogPosts.find(p => p.slug === slug || p.id.toString() === slug);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingComment(true);

    // Mock successful comment submission
    setTimeout(() => {
      setComments([...comments, { ...commentForm, created_at: new Date() }]);
      setCommentForm({ name: "", email: "", comment: "" });
      setIsSubmittingComment(false);
    }, 500);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading blog post</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#f13a34] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Global Hero Section */}
      <GlobalHero
        title={post.title || "Blog Post"}
        subtitle={post.category || "Article"}
        description={post.excerpt || post.summary || ""}
        breadcrumbs={[
          { label: "Home", icon: Home, href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title || "Post", href: `/blog/${slug}`, current: true },
        ]}
        backgroundImage={post.image ? post.image : "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
        centered={true}
        titleColors={{
          first: "white",
          second: "#f13a34",
        }}
      />

      {/* Main Content */}
      <div className="section-container max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-[#f13a34] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          {/* Featured Image */}
          {post.image ? (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : null}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-neutral-600">
            {post.published_at || post.date ? (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.published_at || post.date).toLocaleDateString()}</span>
              </div>
            ) : null}
            {post.author ? (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            ) : null}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            {post.title}
          </h1>

          {/* Content */}
          <div
            className="text-neutral-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content || post.body || post.description || "",
            }}
          />
        </motion.article>

        {/* Comments Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-16 border-t border-neutral-200"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-12 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={commentForm.name}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, name: e.target.value })
                }
                required
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#f13a34]/30 focus:border-[#f13a34] transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={commentForm.email}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, email: e.target.value })
                }
                required
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#f13a34]/30 focus:border-[#f13a34] transition-all"
              />
            </div>
            <textarea
              placeholder="Your Comment"
              value={commentForm.comment}
              onChange={(e) =>
                setCommentForm({ ...commentForm, comment: e.target.value })
              }
              required
              rows="4"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#f13a34]/30 focus:border-[#f13a34] transition-all resize-none"
            />
            <button
              type="submit"
              disabled={isSubmittingComment}
              className="bg-[#f13a34] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#d32f2f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmittingComment ? "Submitting..." : "Submit Comment"}
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={comment.id || index}
                  className="p-6 bg-neutral-50 rounded-xl border border-neutral-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f13a34]/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-[#f13a34]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-neutral-900">
                          {comment.name || comment.author || "Anonymous"}
                        </h4>
                        {comment.created_at && (
                          <span className="text-xs text-neutral-500">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-700">{comment.comment || comment.body}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-500 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default BlogDetail;
