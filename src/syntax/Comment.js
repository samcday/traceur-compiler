// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * A parsed comment that is attached to tree nodes.
 * The content of the comment is fetched from the original SourceFile only
 * when required.
 */

export class Comment {
  constructor(location) {
    this.location = location;
    this.content_ = null;
  }

  // Content of a comment includes the comment delimiter (// or /* */)
  content() {
    if (!this.content_) {
      var sourceContent = this.location.start.source.contents;
      this.content_ = sourceContent.substring(this.location.start.offset, this.location.end.offset);
    }
    return this.content_;
  }

  isMultiline() {
    return content().startsWith('/*');
  }
}
