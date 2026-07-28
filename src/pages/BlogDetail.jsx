import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Home, MessageCircle, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import GlobalHero from "../utils/GlobalHero";
import { blogPosts } from "../constants/blog";

// Corner Brackets Component
const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-gray-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const Tab = ({ label }) => (
  <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-gray-200 bg-white px-4 py-1.5">
    <span className="h-1.5 w-1.5 rounded-full bg-[#4db9e0] motion-safe:animate-pulse" />
    <span className="font-mono text-[9px] tracking-[0.2em] text-gray-500">{label}</span>
  </div>
);

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
          <p className="text-[#4db9e0] mb-4 font-mono text-[11px] uppercase tracking-[0.2em]">Error loading blog post</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#4db9e0] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0] hover:border hover:border-[#4db9e0]"
          >
            <span className="relative flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
              Back to Blog
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
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
          second: "#4db9e0",
        }}
      />

      {/* Main Content */}
      <div className="section-container max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-600 hover:text-[#4db9e0] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Content - Studio Monitor Style */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative border border-gray-200 bg-white p-8 md:p-10"
        >
          <CornerBrackets size="h-4 w-4" />
          <Tab label={post.category || "ARTICLE"} />

          <div className="pt-4">
            {/* Featured Image */}
            {post.image && (
              <div className="mb-8 overflow-hidden border border-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {post.published_at || post.date ? (
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(post.published_at || post.date).toLocaleDateString()}</span>
                </div>
              ) : null}
              {post.author && (
                <>
                  <span className="h-3 w-px bg-gray-300" />
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    <User className="h-3.5 w-3.5" />
                    <span>{post.author}</span>
                  </div>
                </>
              )}
              {post.read_time && (
                <>
                  <span className="h-3 w-px bg-gray-300" />
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    {post.read_time}
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="font-mono text-[35px] font-black uppercase tracking-tight text-gray-900 mb-6 leading-[1.05]">
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none prose-gray">
              <div
                className="text-[15px] text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content || post.body || post.description || "",
                }}
              />
            </div>
          </div>
        </motion.article>

        {/* Comments Section - Studio Monitor Style */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 relative border border-gray-200 bg-white p-8 md:p-10"
        >
          <CornerBrackets size="h-4 w-4" />
          <Tab label="COMMENTS" />

          <div className="pt-4">
            <h2 className="font-mono text-[18px] font-black uppercase tracking-tight text-gray-900 mb-8 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#4db9e0]" />
              Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-12 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={commentForm.name}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, name: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4db9e0] focus:ring-1 focus:ring-[#4db9e0] transition-all duration-300 hover:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={commentForm.email}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, email: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4db9e0] focus:ring-1 focus:ring-[#4db9e0] transition-all duration-300 hover:border-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-2">
                  Your Comment
                </label>
                <textarea
                  placeholder="Share your thoughts..."
                  value={commentForm.comment}
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, comment: e.target.value })
                  }
                  required
                  rows="4"
                  className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4db9e0] focus:ring-1 focus:ring-[#4db9e0] transition-all duration-300 hover:border-gray-400 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingComment}
                className="group inline-flex items-center gap-2 bg-[#4db9e0] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0] hover:border hover:border-[#4db9e0] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                  {isSubmittingComment ? "Submitting..." : "Submit Comment"}
                </span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={comment.id || index}
                    className="relative border border-gray-200 bg-gray-50 p-6"
                  >
                    <CornerBrackets size="h-2 w-2" />
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center border border-[#4db9e0]/30 bg-[#4db9e0]/10 flex-shrink-0">
                        <User className="h-5 w-5 text-[#4db9e0]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">
                            {comment.name || comment.author || "Anonymous"}
                          </h4>
                          {comment.created_at && (
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-400">
                              {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <p className="text-[14px] text-gray-600 leading-relaxed">
                          {comment.comment || comment.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 border border-gray-200 bg-gray-50">
                  <p className="font-mono text-[11px] text-gray-500 uppercase tracking-[0.2em]">
                    No comments yet.
                  </p>
                  <p className="text-[13px] text-gray-400 mt-1">
                    Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default BlogDetail;