import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";

const BlogComponent = ({ data, user, setUser }) => {
  const baseUrl = "https://argosmob.uk/snaptrip/admin/uploads/blogs/";

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <section className="news pb-5 mt-5 " id="blogs">
        <div className="container">
          <div className="row my-5">
            <div class="col-12 text-center">
              <h3 class="display-4 fw-bold theme-text-secondary mb-3">
                Our <span class="high-text">Latest Blogs</span>
              </h3>
              <p class="font-small theme-text-accent-one mb-0">
                An insight to the incredible experience in the world
              </p>
            </div>
          </div>
          <div className="row">
            {data?.map((ele, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="col-md-6 py-5">
                    <div className="row">
                      <div className="col-md-6 col-lg-6">
                        <div
                          className="theme-box-shadow overflow-hidden position-relative"
                          style={{ borderRadius: "15px" }}
                        >
                          <figure className="mb-0 img-effect">
                            <img
                              src={`${baseUrl}${ele?.thumbnail}`}
                              class="imgWidth"
                              alt="news articles"
                            />
                          </figure>
                          <div className="tags position-absolute">
                            <div
                              className="flood-effect"
                              style={{ background: "rgb(0, 107, 126)" }}
                            >
                              <span className="font-small">
                                <i className="bi bi-calendar4-week me-2 font-small"></i>
                                {ele?.create_at.split(" ")[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 p-lg-2 p-xl-4 col-12 col-lg-6">
                        <h2 className="fs-5 fw-bold mb-3">{ele?.title}</h2>
                        <p className="theme-text-accent-one mb-3">
                          {ele?.subdescription}
                        </p>
                        <div>
                          <Link to={`/blogs/${ele.id}`}>
                            <button className="readBtn">Read more</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogComponent;
