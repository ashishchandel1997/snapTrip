import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Blog = ({ data }) => {
  const navigate = useNavigate();

  const baseUrl="https://argosmob.uk/snaptrip/admin/uploads/blogs/"

  const handleReadMore = () => {
    navigate("/blogs");
  };
  return (
    <>
      <section className="news mt-2 " id="blogs">
        <div className="container">
          <div className="row my-5">
            <div className="col-12 text-center">
              <h3 className="headingText">
                Our Latest Blogs
              </h3>
              <p className="font-small theme-text-accent-one mb-0">
              Plunge into drool-worthy places and plan your next trip
              </p>
            </div>
          </div>
          <div className="row">
            {data?.map((ele, i) => {
              if (i < 4) {
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
                                className="imgWidth"
                                alt="news articles"
                              />
                            </figure>
                            <div className="tags position-absolute" style={{background:"#006b7e"}}>
                              <div className="flood-effect">
                                <span className="font-small">
                                  <i className="bi bi-calendar4-week me-2"></i>
                                  {ele?.create_at.split(" ")[0]}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-2 col-12 col-lg-6">
                          <h2 className="fs-5 fw-bold mb-3">{ele?.title}</h2>
                          <p className="theme-text-accent-one mb-3">
                            {ele?.subdescription}..
                          </p>
                          <div>
                            <Link to={`/blogs/${ele.id}`}>
                              <button className="readBtn">Read More</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
            })}
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <button className="readMoreBtn" onClick={handleReadMore}>
                  More Awesome Blogs!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
